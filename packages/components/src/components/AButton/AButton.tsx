import { defineComponent, type PropType } from 'vue';

import './AButton.scss';

type Variant = 'primary' | 'outline' | 'tertiary';
type Size = 'sm' | 'md' | 'lg';

export const AButton = defineComponent({
  name: 'AButton',
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'primary',
    },
    size: {
      type: String as PropType<Size>,
      default: 'md',
    },
    rounded: {
      type: String as PropType<Size>,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event);
      }
    };

    return () => (
      <button
        class={[
          'andi-button',
          `andi-button--${props.variant}`,
          `andi-button--${props.size}`,
          `andi-button--rounded-${props.rounded}`,
          {
            'andi-button--disabled': props.disabled,
          },
        ]}
        type="button"
        aria-disabled={props.disabled ? 'true' : 'false'}
        disabled={props.disabled}
        onClick={handleClick}
      >
        {slots.default?.()}
      </button>
    );
  },
});
