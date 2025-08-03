import { z } from 'zod';

// Avatar
const ColorAvatarSchema = z.object({
  type: z.literal('COLOR'),
  color: z.string(),
});
export type ColorAvatar = z.infer<typeof ColorAvatarSchema>;

// Attachment avatar, user-uploaded avatar with an attachment reference
const AttachmentAvatarSchema = z.object({
  type: z.literal('ATTACHMENT'),
  // Attachment ID, convenient for deletion when replacing
  attachmentId: z.string(),

  // Redundant relative path of the avatar, convenient for direct S3 access
  relativePath: z.string(),
});
export type AttachmentAvatar = z.infer<typeof AttachmentAvatarSchema>;

// External URL avatar, such as using a GitHub avatar after logging in with GitHub, saving bandwidth and storage costs
const UrlAvatarSchema = z.object({
  type: z.literal('URL'),
  url: z.string(),
});
export type UrlAvatar = z.infer<typeof UrlAvatarSchema>;

// Selected from Unsplash
const UnsplashAvatarSchema = z.object({
  type: z.literal('UNSPLASH'),
  url: z.string().url(),
  downloadUrl: z.string().url().optional(),
});
export type UnsplashAvatar = z.infer<typeof UnsplashAvatarSchema>;

export const EmojiAvatarSchema = z.object({
  type: z.literal('EMOJI'),
  backgroundColor: z.string().optional(),
  emoji: z.string(),
});
export type EmojiAvatar = z.infer<typeof EmojiAvatarSchema>;

// AI-generated avatar, an upgraded version of a user-uploaded avatar
const AILogoSchema = z.object({
  type: z.literal('AI'),
  prompt: z.string(), // What AI prompt was used to generate it?
  attachmentId: z.string(),
  relativePath: z.string(),
});

// Preset image, usually matching a URL
const PresetSchema = z.object({
  type: z.literal('PRESET'),
  url: z.string(),
});
export type PresetAvatar = z.infer<typeof PresetSchema>;

export const AvatarLogoSchema = z.discriminatedUnion('type', [
  PresetSchema,
  ColorAvatarSchema,
  AttachmentAvatarSchema,
  EmojiAvatarSchema,
  AILogoSchema,
  UnsplashAvatarSchema,
  UrlAvatarSchema,
]);
/**
 * Six forms: custom uploaded attachment, solid color, external URL, Unsplash, emoji, AI-generated
 * Application scope: user avatars, space station icons, folder covers, node icons, template icons, template folder covers, etc.
 */
export type AvatarLogo = z.infer<typeof AvatarLogoSchema>;
