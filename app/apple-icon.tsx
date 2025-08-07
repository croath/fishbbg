import { ImageResponse } from 'next/og'
 
// Route segment config
export const dynamic = 'force-static'
export const revalidate = false
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 100,
          background: '#FF1F00',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
        }}
      >
        🐠
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}