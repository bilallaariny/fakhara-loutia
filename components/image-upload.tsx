"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  placeholder: string
  dimensions: string
  icon: React.ReactNode
  className?: string
  onImageUpload?: (file: File) => void
}

export function ImageUpload({ placeholder, dimensions, icon, className = "", onImageUpload }: ImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onImageUpload?.(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div
      className={`relative modern-card rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 ${
        isDragging ? "border-[#42322A] border-4 scale-105" : ""
      } ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {uploadedImage ? (
        <div className="relative h-full">
          <img src={uploadedImage || "/placeholder.svg"} alt={placeholder} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-4">
              <Button
                onClick={handleClick}
                className="bg-[#42322A] hover:bg-[#42322A]/80 text-white px-6 py-3 rounded-full"
              >
                Changer l'image
              </Button>
              <Button
                onClick={removeImage}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full ml-2"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div
            className={`absolute inset-0 bg-gradient-to-br from-[#42322A]/25 via-[#D0CFCD]/15 to-[#42322A]/25 ${
              isDragging ? "opacity-100" : "opacity-70"
            } transition-opacity duration-300`}
          ></div>
          <div
            className={`absolute inset-4 border-2 border-dashed transition-all duration-300 rounded-2xl ${
              isDragging ? "border-[#42322A]/70" : "border-[#42322A]/30 group-hover:border-[#42322A]/50"
            }`}
          ></div>

          <div className="relative z-10 text-center space-y-4">
            <div className="w-20 h-20 bg-[#42322A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <p className="text-[#42322A] font-sans text-xl font-bold group-hover:text-[#42322A]/80 transition-colors duration-300">
              {placeholder}
            </p>
            <p className="text-muted-foreground font-sans text-lg">{dimensions}</p>
            <div className="pt-4">
              <p className="text-[#42322A]/60 font-sans text-sm">Cliquez ou glissez une image ici</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
