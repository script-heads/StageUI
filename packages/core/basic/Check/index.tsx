import React, { forwardRef, ForwardRefRenderFunction, useEffect, useState } from 'react'
import { useSystem } from '@stage-ui/system'
import CheckTypes from './types'
import createClasses from './styles'

const Check: ForwardRefRenderFunction<HTMLDivElement, CheckTypes.PrivateProps> = (props, ref) => {
  const { label, disabled, defaultValue, children, checked: checkedProp = false, name } = props

  const {
    classes,
    attributes: { ...attributes },
    events: { onChange, onKeyDown, onClick, ...events },
    styleProps,
  } = useSystem('Check' || name, props, createClasses)

  const [checked, setChecked] = useState(checkedProp || defaultValue || false)

  useEffect(() => {
    setChecked(checkedProp)
  }, [checkedProp])

  /**
   * Change handler
   */
  function handleChange() {
    onChange?.(checked)
    setChecked(!checked)
  }
  /*
   * Keyboard control
   */
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    /**
     * Enter or Space
     */
    if (event.key === 'Enter' || event.key === ' ') {
      handleChange()
      /**
       * Prevent page scrolling
       */
      if (event.key === ' ') {
        event.preventDefault()
      }
    }
    onKeyDown?.(event)
  }

  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    if (!disabled) {
      handleChange()
    }
    onClick?.(e)
  }

  return (
    <div
      ref={ref}
      {...attributes}
      {...events}
      tabIndex={-1}
      css={[classes.container, styleProps.all]}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={checked}
    >
      {children(checked)}
      {label && label.length && <div css={classes.label}>{label}</div>}
    </div>
  )
}

export default forwardRef(Check)
