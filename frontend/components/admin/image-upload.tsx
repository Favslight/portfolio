"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/admin-api";

type ImageUploadProps = {
  label: string;
  value: string | null | undefined;
  onChange: (url: string) => void;
};

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</label>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink-900">
          {value ? (
            <Image src={value} alt={label} width={64} height={64} className="h-full w-full object-cover" unoptimized />
          ) : (
            <span className="text-[10px] text-slate-500">No image</span>
          )}
        </div>
        <div>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-slate-300" />
          {uploading ? <p className="mt-1 text-xs text-brand-300">Uploading...</p> : null}
          {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
