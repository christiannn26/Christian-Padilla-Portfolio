import type { ReactElement } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';

// Touch devices: tapping the flowchart opens it full screen with pinch-to-zoom.
// Lives in its own module so the dialog and zoom libraries load only on touch devices.
export default function FlowchartZoomDialog({ trigger, imageSrc }: { trigger: ReactElement; imageSrc: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-1 md:p-6 bg-black/95 border-white/10 flex flex-col items-center justify-center overflow-hidden">
        <DialogTitle className="sr-only">Interactive System Flowchart Full View</DialogTitle>
        <div className="w-full h-full flex items-center justify-center">
          <TransformWrapper initialScale={1} minScale={1} maxScale={5} wheel={{ wheelDisabled: true }}>
            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
              <img src={imageSrc} alt="System Flowchart Fullscreen" className="max-w-full max-h-full object-contain" />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </DialogContent>
    </Dialog>
  );
}
