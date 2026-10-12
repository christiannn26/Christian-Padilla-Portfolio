import type { ReactElement } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { flowchartMarkup } from './flowchartMarkup';

const DIALOG_SVG = flowchartMarkup('dialog');

// Touch devices: tapping the flowchart opens it full screen with pinch-to-zoom.
// Lives in its own module so the dialog and zoom libraries load only on touch devices.
export default function FlowchartZoomDialog({ trigger }: { trigger: ReactElement }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex h-full max-h-[94vh] w-full max-w-[96vw] flex-col items-center justify-center overflow-hidden rounded-3xl border-line-strong bg-ink-950/95 p-1 md:p-6">
        <DialogTitle className="sr-only">Interactive System Flowchart Full View</DialogTitle>
        <div className="flex h-full w-full items-center justify-center">
          <TransformWrapper initialScale={1} minScale={1} maxScale={5} wheel={{ wheelDisabled: true }}>
            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
              <div
                className="flowchart-art w-full"
                role="img"
                aria-label="System Flowchart Fullscreen"
                dangerouslySetInnerHTML={{ __html: DIALOG_SVG }}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </DialogContent>
    </Dialog>
  );
}
