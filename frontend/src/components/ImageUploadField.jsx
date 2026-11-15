'use client';
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Link as LinkIcon, RefreshCw, AlertCircle } from 'lucide-react';

/**
 * ImageUploadField - Drag & Drop / File Browser / Base64 optimizer with integrated Alt-Text input
 * 
 * Supports:
 * - Direct file upload via file dialog or drag & drop
 * - Automatic client-side canvas compression to WebP/JPEG for fast loading and lean database storage
 * - SVG preservation
 * - Integrated Alt-Text input for SEO and accessibility
 * - URL fallback toggle if an external web address is preferred
 */
export default function ImageUploadField({
  label = 'Bild hochladen',
  helperText = 'Unterstützt PNG, JPG, WebP, SVG (max. 10MB)',
  value = '',
  onChange,
  altValue = '',
  onAltChange,
  altLabel = 'Alt-Text (Bildbeschreibung)',
  altPlaceholder = 'Beschreiben Sie den Bildinhalt für SEO & Barrierefreiheit...',
  aspectRatio = 'auto',
  className = '',
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [imageMeta, setImageMeta] = useState(null);

  // Optimize and process uploaded file
  const processFile = (file) => {
    if (!file) return;
    setError(null);

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|svg|gif)$/i)) {
      setError('Bitte wählen Sie ein gültiges Bildformat (JPG, PNG, WebP, SVG, GIF).');
      return;
    }

    // Size limit: 12MB before compression
    if (file.size > 12 * 1024 * 1024) {
      setError('Die Datei ist zu groß (maximal 12 MB erlaubt).');
      return;
    }

    setIsProcessing(true);

    // If SVG or GIF, preserve raw as Data URL
    if (file.type === 'image/svg+xml' || file.name.endsWith('.svg') || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && onChange) {
          onChange(result);
          setImageMeta({
            name: file.name,
            sizeKb: Math.round(file.size / 1024),
            type: file.type || 'image/svg+xml',
          });
        }
        setIsProcessing(false);
      };
      reader.onerror = () => {
        setError('Fehler beim Lesen der Datei.');
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
      return;
    }

    // For raster images (PNG, JPG, WebP): resize and compress using HTML5 Canvas
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 1800; // max dimension in px
          let { width, height } = img;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas context unavailable');
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Prefer WebP compression; fallback to JPEG
          let optimizedDataUrl = '';
          try {
            optimizedDataUrl = canvas.toDataURL('image/webp', 0.88);
            if (!optimizedDataUrl.startsWith('data:image/webp')) {
              optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            }
          } catch {
            optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          }

          const approxSizeKb = Math.round((optimizedDataUrl.length * 3) / 4 / 1024);

          if (onChange) {
            onChange(optimizedDataUrl);
          }

          setImageMeta({
            name: file.name,
            width,
            height,
            sizeKb: approxSizeKb,
            type: 'optimized',
          });
        } catch (err) {
          console.error('Error optimizing image:', err);
          // Fallback to raw data URL
          if (onChange) {
            onChange(e.target.result);
          }
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setError('Bild konnte nicht geladen werden.');
        setIsProcessing(false);
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      setError('Fehler beim Einlesen des Bildes.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (onChange) onChange('');
    setImageMeta(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label and Actions */}
      <div className="flex items-center justify-between">
        <label className="block font-spartan font-bold text-xs uppercase tracking-wider text-[#242E05]">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlFallback(!showUrlFallback)}
          className="text-[11px] font-spartan font-semibold text-stone-500 hover:text-[#384808] flex items-center gap-1 transition-colors"
        >
          <LinkIcon size={12} />
          {showUrlFallback ? 'Upload anzeigen' : 'URL manuell eingeben'}
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/gif"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Zone / Preview Card */}
      {!showUrlFallback ? (
        <div>
          {value ? (
            /* Current Image Preview Box */
            <div className="relative group rounded-xl border border-stone-200 bg-white p-3 shadow-xs transition-all hover:border-[#384808]/40">
              <div className="flex items-center gap-3.5">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center relative shadow-inner">
                  <img
                    src={value}
                    alt={altValue || 'Vorschau'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <RefreshCw size={18} className="animate-spin text-[#384808]" />
                    </div>
                  )}
                </div>

                {/* Details & Actions */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#242E05]">
                    <Check size={14} className="text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {imageMeta?.name || (value.startsWith('data:') ? 'Eigenes hochgeladenes Bild' : value.split('/').pop() || 'Bild aktiv')}
                    </span>
                  </div>
                  {imageMeta && (
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {imageMeta.width && `${imageMeta.width}×${imageMeta.height}px • `}
                      {imageMeta.sizeKb} KB
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#384808] text-white text-xs font-spartan font-bold hover:bg-[#242E05] transition-colors"
                    >
                      <Upload size={12} />
                      Bild austauschen
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-rose-200 text-rose-600 bg-rose-50/50 text-xs font-spartan font-bold hover:bg-rose-100 transition-colors"
                    >
                      <X size={12} />
                      Entfernen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Drag and Drop Upload Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed transition-all p-5 text-center flex flex-col items-center justify-center gap-2 select-none ${
                isDragging
                  ? 'border-[#384808] bg-[#384808]/5 scale-[0.99]'
                  : 'border-stone-300 hover:border-[#384808]/60 bg-[#F9F8F3]/60 hover:bg-[#F9F8F3]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-stone-200 flex items-center justify-center text-[#384808]">
                {isProcessing ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <Upload size={20} />
                )}
              </div>
              <div>
                <p className="text-xs font-spartan font-bold text-[#242E05]">
                  Datei hierher ziehen oder <span className="text-[#384808] underline">durchsuchen</span>
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">{helperText}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Direct URL Input Mode */
        <div className="space-y-1.5 p-3 rounded-xl border border-stone-200 bg-[#F9F8F3]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange && onChange(e.target.value)}
              placeholder="https://example.com/bild.jpg oder /images/..."
              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-white focus:outline-none focus:border-[#384808]"
            />
            {value && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="p-1.5 text-stone-400 hover:text-rose-600 rounded-md"
                title="Löschen"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <p className="text-[10px] text-stone-500">
            Geben Sie einen relativen Pfad (/images/...) oder eine vollständige Bild-URL ein.
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
          <AlertCircle size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* SEO Alt-Text Input Field */}
      {onAltChange && (
        <div className="pt-1">
          <label className="block font-spartan font-bold text-[11px] uppercase tracking-wider text-[#242E05] mb-1">
            {altLabel}
          </label>
          <input
            type="text"
            value={altValue || ''}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder={altPlaceholder}
            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none focus:border-[#384808]"
          />
          <p className="text-[10px] text-stone-400 mt-0.5">
            Wichtig für Suchmaschinen (Google Image SEO) und Barrierefreiheit.
          </p>
        </div>
      )}
    </div>
  );
}
