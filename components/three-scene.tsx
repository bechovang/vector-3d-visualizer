"use client"

import { useEffect, useRef } from "react"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// We'll load Three.js dynamically to avoid import issues
// declare global {
//   interface Window {
//     THREE: any
//   }
// }

interface Vector3D {
  x: number
  y: number
  z: number
}

type OperationMode = "cross-product" | "projection-u-v" | "projection-v-u" | "dot-product"

interface Calculations {
  crossProduct?: Vector3D
  projectionUV?: Vector3D
  projectionVU?: Vector3D
}

interface ThreeSceneProps {
  vectorU: Vector3D
  vectorV: Vector3D
  mode: OperationMode
  calculations: Calculations
}

export default function ThreeScene({ vectorU, vectorV, mode, calculations }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneDataRef = useRef<any>(null)

  useEffect(() => {
    // Load Three.js from CDN
    // const loadThreeJS = async () => {
    //   if (typeof window !== "undefined" && !window.THREE) {
    //     // Load Three.js core
    //     await new Promise((resolve, reject) => {
    //       const script = document.createElement("script")
    //       script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/three.min.js"
    //       script.onload = resolve
    //       script.onerror = reject
    //       document.head.appendChild(script)
    //     })

    //     // Load OrbitControls
    //     await new Promise((resolve, reject) => {
    //       const script = document.createElement("script")
    //       script.src = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/js/controls/OrbitControls.js"
    //       script.onload = resolve
    //       script.onerror = reject
    //       document.head.appendChild(script)
    //     })
    //   }
    // }

    // loadThreeJS().then(() => {
    //   if (!mountRef.current || !window.THREE) return

    //   const THREE = window.THREE
    if (!mountRef.current) return;

      const currentMount = mountRef.current

      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xf8fafc)

      const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
      camera.position.set(5, 4, 5)

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      currentMount.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
      directionalLight.position.set(5, 10, 7)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      // Grid and axes
      const gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xdddddd)
      scene.add(gridHelper)

      const axesHelper = new THREE.AxesHelper(3)
      scene.add(axesHelper)

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.minDistance = 2
      controls.maxDistance = 20

      // Create vector arrows using ArrowHelper (simpler approach)
      const vectorUArrow = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        1,
        0x8b5cf6,
        0.2,
        0.1,
      )
      const vectorVArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        1,
        0xef4444,
        0.2,
        0.1,
      )
      const resultArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 0),
        1,
        0x10b981,
        0.2,
        0.1,
      )

      scene.add(vectorUArrow)
      scene.add(vectorVArrow)
      scene.add(resultArrow)

      sceneDataRef.current = {
        scene,
        camera,
        renderer,
        controls,
        vectorUArrow,
        vectorVArrow,
        resultArrow,
      }

      // Animation loop
      const animate = () => {
        if (!sceneDataRef.current) return
        requestAnimationFrame(animate)
        sceneDataRef.current.controls.update()
        sceneDataRef.current.renderer.render(sceneDataRef.current.scene, sceneDataRef.current.camera)
      }
      animate()

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current || !sceneDataRef.current) return
        const { camera, renderer } = sceneDataRef.current
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      }
      window.addEventListener("resize", handleResize)

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize)
        if (sceneDataRef.current) {
          sceneDataRef.current.renderer.dispose()
          if (sceneDataRef.current.controls) {
            sceneDataRef.current.controls.dispose();
          }
        }
        if (currentMount && sceneDataRef.current?.renderer.domElement) {
          currentMount.removeChild(sceneDataRef.current.renderer.domElement)
        }
      }
    // })
  }, [])

  useEffect(() => {
    if (!sceneDataRef.current || !calculations) return

    const { scene, vectorUArrow, vectorVArrow, resultArrow } = sceneDataRef.current

    // Update vector U
    const dirU = new THREE.Vector3(vectorU.x, vectorU.y, vectorU.z)
    const lengthU = dirU.length()
    if (lengthU > 0) {
      vectorUArrow.setDirection(dirU.normalize())
      vectorUArrow.setLength(lengthU, lengthU * 0.2, lengthU * 0.1)
      vectorUArrow.visible = true
    } else {
      vectorUArrow.visible = false
    }

    // Update vector V
    const dirV = new THREE.Vector3(vectorV.x, vectorV.y, vectorV.z)
    const lengthV = dirV.length()
    if (lengthV > 0) {
      vectorVArrow.setDirection(dirV.normalize())
      vectorVArrow.setLength(lengthV, lengthV * 0.2, lengthV * 0.1)
      vectorVArrow.visible = true
    } else {
      vectorVArrow.visible = false
    }

    // Clear previous additional objects
    if (sceneDataRef.current.parallelogram) {
      scene.remove(sceneDataRef.current.parallelogram)
      sceneDataRef.current.parallelogram = undefined
    }
    if (sceneDataRef.current.projectionLine) {
      scene.remove(sceneDataRef.current.projectionLine)
      sceneDataRef.current.projectionLine = undefined
    }

    resultArrow.visible = false

    // Update result based on mode
    switch (mode) {
      case "cross-product":
        if (calculations.crossProduct) {
          const dirResult = new THREE.Vector3(
            calculations.crossProduct.x,
            calculations.crossProduct.y,
            calculations.crossProduct.z,
          )
          const lengthResult = dirResult.length()
          if (lengthResult > 0) {
            resultArrow.setDirection(dirResult.normalize())
            resultArrow.setLength(lengthResult, lengthResult * 0.2, lengthResult * 0.1)
            resultArrow.setColor(0x10b981)
            resultArrow.visible = true
          }

          // Add parallelogram
          const parallelogram = createParallelogram(vectorU, vectorV)
          scene.add(parallelogram)
          sceneDataRef.current.parallelogram = parallelogram
        }
        break

      case "projection-u-v":
        if (calculations.projectionUV) {
          const dirResult = new THREE.Vector3(
            calculations.projectionUV.x,
            calculations.projectionUV.y,
            calculations.projectionUV.z,
          )
          const lengthResult = dirResult.length()
          if (lengthResult > 0) {
            resultArrow.setDirection(dirResult.normalize())
            resultArrow.setLength(lengthResult, lengthResult * 0.2, lengthResult * 0.1)
            resultArrow.setColor(0x3b82f6)
            resultArrow.visible = true
          }

          // Add projection line
          const projectionLine = createProjectionLine(vectorU, calculations.projectionUV)
          scene.add(projectionLine)
          sceneDataRef.current.projectionLine = projectionLine
        }
        break

      case "projection-v-u":
        if (calculations.projectionVU) {
          const dirResult = new THREE.Vector3(
            calculations.projectionVU.x,
            calculations.projectionVU.y,
            calculations.projectionVU.z,
          )
          const lengthResult = dirResult.length()
          if (lengthResult > 0) {
            resultArrow.setDirection(dirResult.normalize())
            resultArrow.setLength(lengthResult, lengthResult * 0.2, lengthResult * 0.1)
            resultArrow.setColor(0x22c55e)
            resultArrow.visible = true
          }

          // Add projection line (from V origin to its projection on U)
          const projectionLine = createProjectionLine(vectorV, calculations.projectionVU)
          scene.add(projectionLine)
          sceneDataRef.current.projectionLine = projectionLine
        }
        break

      case "dot-product":
        resultArrow.visible = false
        break
    }
  }, [vectorU, vectorV, mode, calculations])

  return (
    <div ref={mountRef} className="w-full h-full rounded-lg overflow-hidden" />
  )
}

function createParallelogram(vectorU: Vector3D, vectorV: Vector3D) {
  const geometry = new THREE.BufferGeometry()

  const vertices = new Float32Array([
    0,
    0,
    0,
    vectorU.x,
    vectorU.y,
    vectorU.z,
    vectorU.x + vectorV.x,
    vectorU.y + vectorV.y,
    vectorU.z + vectorV.z,
    vectorV.x,
    vectorV.y,
    vectorV.z,
  ])

  const indices = new Uint16Array([0, 1, 3, 1, 2, 3])

  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))
  geometry.computeVertexNormals()

  const material = new THREE.MeshStandardMaterial({
    color: 0xbebebe,
    opacity: 0.3,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  })

  return new THREE.Mesh(geometry, material)
}

function createProjectionLine(fromVector: Vector3D, toVector: Vector3D) {
  const points = []
  points.push(new THREE.Vector3(fromVector.x, fromVector.y, fromVector.z))
  points.push(new THREE.Vector3(toVector.x, toVector.y, toVector.z))

  const geometry = new THREE.BufferGeometry()
  geometry.setFromPoints(points)

  const material = new THREE.LineBasicMaterial({ color: 0x78716c, linewidth: 2 })

  return new THREE.Line(geometry, material)
}
