import React, { useRef } from "react"
import styled from "styled-components"

type PaginationItemProps = {
  onLoadMore: () => void
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  onLoadMore,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  React.useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const element = entries[0]

        if (element.isIntersecting) {
          onLoadMore()
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    )

    observer.observe(element as HTMLDivElement)

    return () => observer.disconnect()
  }, [onLoadMore])

  return <Container ref={ref} />
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
