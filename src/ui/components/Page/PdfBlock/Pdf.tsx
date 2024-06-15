import { useState, useEffect, useRef } from 'react'
import { PDFDocumentProxy, PDFPageProxy, GlobalWorkerOptions, getDocument, version } from 'pdfjs-dist'
import type { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api'

function isFunction (value: any): value is Function {
  return typeof value === 'function'
}

type PDFRenderTask = ReturnType<PDFPageProxy['render']>

type HookProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  file: string
  onDocumentLoadSuccess?: (document: PDFDocumentProxy) => void
  onDocumentLoadFail?: () => void
  onPageLoadSuccess?: (page: PDFPageProxy) => void
  onPageLoadFail?: () => void
  onPageRenderSuccess?: (page: PDFPageProxy) => void
  onPageRenderFail?: () => void
  scale?: number
  rotate?: number
  page?: number
  cMapUrl?: string
  cMapPacked?: boolean
  workerSrc?: string
  withCredentials?: boolean
}

type HookReturnValues = {
  pdfDocument: PDFDocumentProxy | undefined
  pdfPage: PDFPageProxy | undefined
}

export const usePdf = ({
  canvasRef,
  file,
  onDocumentLoadSuccess,
  onDocumentLoadFail,
  onPageLoadSuccess,
  onPageLoadFail,
  onPageRenderSuccess,
  onPageRenderFail,
  scale = 1,
  rotate = 0,
  page = 1,
  cMapUrl,
  cMapPacked,
  workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.mjs`,
  withCredentials = false,
}: HookProps): HookReturnValues => {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy>()
  const [pdfPage, setPdfPage] = useState<PDFPageProxy>()
  const renderTask = useRef<PDFRenderTask | null>(null)
  const lastPageRequestedRenderRef = useRef<PDFPageProxy | null>(null)
  const onDocumentLoadSuccessRef = useRef(onDocumentLoadSuccess)
  const onDocumentLoadFailRef = useRef(onDocumentLoadFail)
  const onPageLoadSuccessRef = useRef(onPageLoadSuccess)
  const onPageLoadFailRef = useRef(onPageLoadFail)
  const onPageRenderSuccessRef = useRef(onPageRenderSuccess)
  const onPageRenderFailRef = useRef(onPageRenderFail)

  useEffect(() => { onDocumentLoadSuccessRef.current = onDocumentLoadSuccess }, [onDocumentLoadSuccess])
  useEffect(() => { onDocumentLoadFailRef.current = onDocumentLoadFail }, [onDocumentLoadFail])
  useEffect(() => { onPageLoadSuccessRef.current = onPageLoadSuccess }, [onPageLoadSuccess])
  useEffect(() => { onPageLoadFailRef.current = onPageLoadFail }, [onPageLoadFail])
  useEffect(() => { onPageRenderSuccessRef.current = onPageRenderSuccess }, [onPageRenderSuccess])
  useEffect(() => { onPageRenderFailRef.current = onPageRenderFail }, [onPageRenderFail])
  useEffect(() => { GlobalWorkerOptions.workerSrc = workerSrc }, [workerSrc])

  useEffect(() => {
    const config: DocumentInitParameters = { url: file, withCredentials }
    if (cMapUrl) {
      config.cMapUrl = cMapUrl
      config.cMapPacked = cMapPacked
    }
    getDocument(config).promise.then(
      (loadedPdfDocument) => {
        setPdfDocument(loadedPdfDocument)
        if (isFunction(onDocumentLoadSuccessRef.current)) {
          onDocumentLoadSuccessRef.current(loadedPdfDocument)
        }
      },
      () => {
        if (isFunction(onDocumentLoadFailRef.current)) {
          onDocumentLoadFailRef.current()
        }
      }
    )
  }, [file, withCredentials, cMapUrl, cMapPacked])

  useEffect(() => {
    const drawPDF = (page: PDFPageProxy) => {
      const rotation = rotate === 0 ? page.rotate : page.rotate + rotate
      const viewport = page.getViewport({ scale, rotation })
      const canvasEl = canvasRef!.current
      if (!canvasEl) {
        return
      }
      const canvasContext = canvasEl.getContext('2d')
      if (!canvasContext) {
        return
      }

      canvasEl.height = viewport.height * window.devicePixelRatio
      canvasEl.width = viewport.width * window.devicePixelRatio
      canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio)

      if (renderTask.current) {
        lastPageRequestedRenderRef.current = page
        renderTask.current.cancel()
        return
      }

      renderTask.current = page.render({
        canvasContext,
        viewport,
      })

      return renderTask.current.promise.then(
        () => {
          renderTask.current = null
          if (isFunction(onPageRenderSuccessRef.current)) {
            onPageRenderSuccessRef.current(page)
          }
        },
        (reason: Error) => {
          renderTask.current = null
          if (reason && reason.name === 'RenderingCancelledException') {
            const lastPageRequestedRender = lastPageRequestedRenderRef.current ?? page
            lastPageRequestedRenderRef.current = null
            drawPDF(lastPageRequestedRender)
          } else if (isFunction(onPageRenderFailRef.current)) {
            onPageRenderFailRef.current()
          }
        }
      )
    }

    if (pdfDocument) {
      pdfDocument.getPage(page).then(
        (loadedPdfPage) => {
          setPdfPage(loadedPdfPage)
          if (isFunction(onPageLoadSuccessRef.current)) {
            onPageLoadSuccessRef.current(loadedPdfPage)
          }
          drawPDF(loadedPdfPage)
        },
        () => {
          if (isFunction(onPageLoadFailRef.current)) {
            onPageLoadFailRef.current()
          }
        }
      )
    }
  }, [canvasRef, page, pdfDocument, rotate, scale])

  return { pdfDocument, pdfPage }
}
