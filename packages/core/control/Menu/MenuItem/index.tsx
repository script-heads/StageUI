import { jsx } from '@emotion/react'
import { useSystem } from '@stage-ui/system'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { useValue } from '..'
import createClasses from './styles'
import Types from './types'

const MenuItem: ForwardRefRenderFunction<HTMLDivElement, Types.Props> = (props, ref) => {
  let [active, setActive, ctx] = useValue(props.value)

  const { rightChild, leftChild, disabled, as = ctx.itemAs || 'a', href } = props

  const { classes, attributes, events, styleProps } = useSystem('MenuItem', props, createClasses)

  /**
   * Support controlled
   */
  if (props.active != undefined) {
    active = props.active
  }

  const containerRef = React.useRef<HTMLDivElement>(null)
  /**
   * After item active change we're searching upward
   * for sections, and setting active dataset to id
   */
  React.useEffect(() => {
    const recursive = (target: HTMLElement | null) => {
      if (!target) return
      switch (target.dataset.flow) {
        case 'menu':
          break
        case 'sub-menu':
          if (active) {
            target.dataset.flowActive = ''
          } else {
            /**
             * Fixed issue wrong unselecting section when
             * section still has active items inside
             */
            if (target.querySelector('[data-flow-active]') === null) {
              delete target.dataset.flowActive
            }
          }
        default:
          recursive(target.parentElement)
      }
    }
    recursive(containerRef.current)
  }, [active])

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

  const attr: Record<string, string> = {
    'data-flow': 'menu-item',
  }
  if (active) attr['data-flow-active'] = ''
  if (disabled) attr['data-flow-disabled'] = ''

  const itemProps = {
    ...attr,
    ...attributes,
    ...events,
    onChange: undefined,
    href: as === 'a' ? href : undefined,
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      !(e.ctrlKey || e.metaKey) && e.preventDefault()

      if (!disabled) {
        setActive()
        ctx.onChange?.(props.value)
        events.onClick?.(e)
      }
    },
    onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => {
      /**
       * Handle Space/Enter at focus
       */
      if (!disabled && ['Enter', ' '].includes(e.key)) {
        setActive()
        ctx.onChange?.(props.value)
        e.preventDefault()
      }
      events.onKeyPress?.(e)
    },
    ref: containerRef,
    css: [classes.container, styleProps.all],
  }

  return jsx(
    `${as}`,
    itemProps,
    <>
      <span data-flow-indent="" />
      {leftChild && <span data-flow="left">{leftChild}</span>}
      <span data-flow="middle">{props.children || props.title}</span>
      {rightChild && <span data-flow="right">{rightChild}</span>}
    </>,
  )
}

export default forwardRef(MenuItem)
