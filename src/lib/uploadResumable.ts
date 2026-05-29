import * as tus from "tus-js-client";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/**
 * Resumable upload to Supabase Storage using the TUS protocol.
 * Handles arbitrarily large files (multi-GB 4K videos) and auto-retries on
 * network drops. Chunk size MUST be 6MB (Supabase requirement).
 */
export function uploadResumable(opts: {
  bucket: string;
  path: string;
  file: File;
  onProgress?: (pct: number) => void;
}): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token ?? ANON_KEY;

    const upload = new tus.Upload(opts.file, {
      endpoint: `${SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 1000, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${token}`,
        "x-upsert": "false",
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: opts.bucket,
        objectName: opts.path,
        contentType: opts.file.type || "video/mp4",
        cacheControl: "3600",
      },
      chunkSize: 6 * 1024 * 1024,
      onError: (err) => reject(err),
      onProgress: (sent, total) => {
        if (opts.onProgress) opts.onProgress(Math.round((sent / total) * 100));
      },
      onSuccess: () => resolve(),
    });

    // Resume previous upload if any (same file fingerprint).
    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length > 0) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    upload.start();
  });
}
