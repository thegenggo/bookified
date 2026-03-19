"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, ImageIcon, X } from "lucide-react"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { UploadSchema } from "@/lib/zod"
import { voiceOptions, voiceCategories, DEFAULT_VOICE } from "@/lib/constants"
import { cn } from "@/lib/utils"
import LoadingOverlay from "@/components/LoadingOverlay"
import type { BookUploadFormValues, FileUploadFieldProps, InputFieldProps } from "@/types"

// ── Reusable sub-components ──────────────────────────────────

const FileUploadField = ({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploadFieldProps<BookUploadFormValues>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const file = field.value as File | undefined

        const clearFile = () => {
          field.onChange(undefined)
          if (inputRef.current) inputRef.current.value = ""
        }

        return (
          <FormItem>
            <label className="form-label">{label}</label>
            <FormControl>
              <div>
                <input
                  ref={inputRef}
                  type="file"
                  accept={acceptTypes.join(",")}
                  disabled={disabled}
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0]
                    if (selected) field.onChange(selected)
                  }}
                />
                {!file ? (
                  <div
                    className="upload-dropzone"
                    onClick={() => inputRef.current?.click()}
                  >
                    <Icon className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">{placeholder}</p>
                    <p className="upload-dropzone-hint">{hint}</p>
                  </div>
                ) : (
                  <div className="upload-dropzone upload-dropzone-uploaded">
                    <div className="flex items-center gap-3">
                      <p className="upload-dropzone-text font-semibold">
                        {file.name}
                      </p>
                      <button
                        type="button"
                        className="upload-dropzone-remove"
                        onClick={clearFile}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

const InputField = ({
  control,
  name,
  label,
  placeholder,
  disabled,
}: InputFieldProps<BookUploadFormValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <label className="form-label">{label}</label>
        <FormControl>
          <input
            className="form-input"
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            value={field.value as string}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

const VOICE_GROUPS = [
  { key: "male" as const, label: "Male Voices" },
  { key: "female" as const, label: "Female Voices" },
]

const VoiceSelector = ({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (id: string) => void
  disabled?: boolean
}) => (
  <div className="space-y-4">
    {VOICE_GROUPS.map(({ key, label }) => (
      <div key={key}>
        <p className="text-sm font-medium text-(--text-secondary) mb-3">
          {label}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {voiceCategories[key].map((voiceKey) => {
            const voice = voiceOptions[voiceKey as keyof typeof voiceOptions]
            const isSelected = value === voiceKey

            return (
              <label
                key={voiceKey}
                className={cn(
                  "voice-selector-option",
                  isSelected
                    ? "voice-selector-option-selected"
                    : "voice-selector-option-default",
                  disabled && "voice-selector-option-disabled"
                )}
              >
                <input
                  type="radio"
                  name="voice"
                  value={voiceKey}
                  checked={isSelected}
                  onChange={() => onChange(voiceKey)}
                  disabled={disabled}
                  className="w-4 h-4 accent-[#663820]"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-(--text-primary)">
                    {voice.name}
                  </span>
                  <span className="text-xs text-(--text-secondary) leading-tight">
                    {voice.description}
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>
    ))}
  </div>
)

// ── Main form ────────────────────────────────────────────────

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: DEFAULT_VOICE,
      pdf: undefined,
      coverImage: undefined,
    },
  })

  const onSubmit = async (data: BookUploadFormValues) => {
    setIsSubmitting(true)
    try {
      console.log("Form submitted:", data)
      // TODO: handle actual submission
      await new Promise((resolve) => setTimeout(resolve, 3000))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="new-book-wrapper">
          <div className="space-y-8">
            <FileUploadField
              control={form.control}
              name="pdf"
              label="Book PDF File"
              acceptTypes={[".pdf"]}
              icon={Upload}
              placeholder="Click to upload PDF"
              hint="PDF file (max 50MB)"
              disabled={isSubmitting}
            />

            <FileUploadField
              control={form.control}
              name="coverImage"
              label="Cover Image (Optional)"
              acceptTypes={["image/*"]}
              icon={ImageIcon}
              placeholder="Click to upload cover image"
              hint="Leave empty to auto-generate from PDF"
              disabled={isSubmitting}
            />

            <InputField
              control={form.control}
              name="title"
              label="Title"
              placeholder="ex: Rich Dad Poor Dad"
              disabled={isSubmitting}
            />

            <InputField
              control={form.control}
              name="author"
              label="Author Name"
              placeholder="ex: Robert Kiyosaki"
              disabled={isSubmitting}
            />

            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <label className="form-label">Choose Assistant Voice</label>
                  <FormControl>
                    <VoiceSelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button type="submit" className="form-btn" disabled={isSubmitting}>
              Begin Synthesis
            </button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default UploadForm