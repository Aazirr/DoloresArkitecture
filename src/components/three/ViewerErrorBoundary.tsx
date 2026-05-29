"use client";

import { Component, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  poster?: string;
}

interface State {
  hasError: boolean;
}

export class ViewerErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#080808]">
        {this.props.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={this.props.poster}
            alt="Project render"
            className="h-full w-full object-cover opacity-50"
          />
        ) : (
          <>
            <RotateCcw className="h-6 w-6 text-[#5e5c59]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#5e5c59]">
              3D model not yet available
            </p>
          </>
        )}
      </div>
    );
  }
}
