"use client";

import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <Canvas>
        <DotMatrix
          colors={colors}
          dotSize={dotSize}
          opacities={opacities}
          shader={`
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
              opacity *= step(intro_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            `}
        />
      </Canvas>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

const DotMatrix: React.FC<{
  colors: number[][];
  opacities: number[];
  totalSize?: number;
  dotSize: number;
  shader: string;
}> = ({ colors, opacities, totalSize = 4, dotSize, shader }) => {
  const uniforms = useMemo(() => {
    return {
      u_colors: { value: colors.map((c) => c.map((v) => v / 255)) },
      u_opacities: { value: opacities },
      u_total_size: { value: totalSize },
      u_dot_size: { value: dotSize },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return (
    <ShaderMaterial
      source={`
        precision mediump float;
        uniform float u_time;
        uniform vec3 u_colors[6];
        uniform float u_opacities[10];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;

        float random(vec2 xy) {
            return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            vec2 st = gl_FragCoord.xy / u_resolution;
            vec3 color = u_colors[int(mod(u_time * 3.0, 6.0))];
            float opacity = u_opacities[int(random(st) * 10.0)];

            ${shader}

            fragColor = vec4(color, opacity);
        }
      `}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};

const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string;
  uniforms: any;
  maxFps?: number;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh>(null);
  const preparedUniforms = useMemo(() => {
    const finalUniforms = { ...uniforms };
    finalUniforms.u_time = { value: 0 };
    finalUniforms.u_resolution = {
      value: new THREE.Vector2(size.width, size.height),
    };
    return finalUniforms;
  }, [uniforms, size]);

  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[size.width, size.height]} />
      <shaderMaterial
        attach="material"
        fragmentShader={source}
        uniforms={preparedUniforms}
      />
    </mesh>
  );
};
