import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private readonly cloudName = environment.cloudinary?.cloudName || 'flppuodw';
  private readonly uploadPreset = environment.cloudinary?.uploadPreset || 'ml_default';
  private readonly uploadUrl =
    environment.cloudinary?.uploadUrl || `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  get isConfigured(): boolean {
    return !!(this.cloudName && this.uploadPreset);
  }

  get configInfo() {
    return {
      cloudName: this.cloudName,
      uploadPreset: this.uploadPreset,
      uploadUrl: this.uploadUrl
    };
  }

  /**
   * Uploads an image file or base64 data to Cloudinary via unsigned upload preset.
   */
  async uploadImage(
    fileOrBase64: File | string,
    folder: string = 'aircom'
  ): Promise<CloudinaryUploadResult> {
    const formData = new FormData();
    formData.append('file', fileOrBase64);
    formData.append('upload_preset', this.uploadPreset);
    if (folder) {
      formData.append('folder', folder);
    }

    try {
      const response = await fetch(this.uploadUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMsg = data.error?.message || response.statusText || 'Upload failed';
        if (errorMsg.includes('whitelisted for unsigned uploads')) {
          throw new Error(
            `Cloudinary preset '${this.uploadPreset}' must be set to 'Unsigned' mode in Cloudinary Console (Settings > Upload > Upload presets > Edit '${this.uploadPreset}' > Signing Mode: Unsigned). Alternatively, you can paste any direct image URL.`
          );
        }
        throw new Error(`Cloudinary Error: ${errorMsg}`);
      }

      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
        format: data.format,
        width: data.width,
        height: data.height,
        created_at: data.created_at
      };
    } catch (err: any) {
      console.error('Cloudinary upload failure:', err);
      throw err;
    }
  }

  /**
   * Generates a transformed/optimized Cloudinary URL if it is a Cloudinary asset.
   */
  optimizeUrl(url: string, width?: number, quality = 'auto'): string {
    if (!url || !url.includes('cloudinary.com')) return url;
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;
    const transformations = [`f_auto`, `q_${quality}`];
    if (width) transformations.push(`w_${width}`);
    return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
  }
}
