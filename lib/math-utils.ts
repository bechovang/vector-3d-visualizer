import type { Vector3D, OperationMode } from "@/app/page"

export function calculateVectorOperations(vectorU: Vector3D, vectorV: Vector3D, mode: OperationMode) {
  // Basic calculations
  const magnitudeU = Math.sqrt(vectorU.x ** 2 + vectorU.y ** 2 + vectorU.z ** 2)
  const magnitudeV = Math.sqrt(vectorV.x ** 2 + vectorV.y ** 2 + vectorV.z ** 2)

  // Dot product
  const dotProduct = vectorU.x * vectorV.x + vectorU.y * vectorV.y + vectorU.z * vectorV.z

  // Angle between vectors
  const cosAngle = magnitudeU > 0 && magnitudeV > 0 ? dotProduct / (magnitudeU * magnitudeV) : 0
  const angleRadians = Math.acos(Math.max(-1, Math.min(1, cosAngle)))
  const angleDegrees = (angleRadians * 180) / Math.PI

  // Cross product
  const crossProduct: Vector3D = {
    x: vectorU.y * vectorV.z - vectorU.z * vectorV.y,
    y: vectorU.z * vectorV.x - vectorU.x * vectorV.z,
    z: vectorU.x * vectorV.y - vectorU.y * vectorV.x,
  }

  const crossProductMagnitude = Math.sqrt(crossProduct.x ** 2 + crossProduct.y ** 2 + crossProduct.z ** 2)

  // Parallelogram area (magnitude of cross product)
  const parallelogramArea = crossProductMagnitude

  // Projections
  let projectionUV: Vector3D = { x: 0, y: 0, z: 0 }
  let projectionVU: Vector3D = { x: 0, y: 0, z: 0 }

  if (magnitudeU > 0) {
    const scalarProjVU = dotProduct / magnitudeU ** 2
    projectionVU = {
      x: scalarProjVU * vectorU.x,
      y: scalarProjVU * vectorU.y,
      z: scalarProjVU * vectorU.z,
    }
  }

  if (magnitudeV > 0) {
    const scalarProjUV = dotProduct / magnitudeV ** 2
    projectionUV = {
      x: scalarProjUV * vectorV.x,
      y: scalarProjUV * vectorV.y,
      z: scalarProjUV * vectorV.z,
    }
  }

  const projectionUVMagnitude = Math.sqrt(projectionUV.x ** 2 + projectionUV.y ** 2 + projectionUV.z ** 2)

  const projectionVUMagnitude = Math.sqrt(projectionVU.x ** 2 + projectionVU.y ** 2 + projectionVU.z ** 2)

  return {
    magnitudeU,
    magnitudeV,
    dotProduct,
    angleRadians,
    angleDegrees,
    crossProduct,
    crossProductMagnitude,
    parallelogramArea,
    projectionUV,
    projectionVU,
    projectionUVMagnitude,
    projectionVUMagnitude,
  }
}
