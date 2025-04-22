import { computed, defineComponent, type PropType } from 'vue';

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
    bgColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
    borderColor: {
      type: String,
    },
    bgHoverColor: {
      type: String,
    },
    textHoverColor: {
      type: String,
    },
    borderHoverColor: {
      type: String,
    },
    bgActiveColor: {
      type: String,
    },
    textActiveColor: {
      type: String,
    },
    borderActiveColor: {
      type: String,
    },
    disabledBgColor: {
      type: String,
    },
    disabledTextColor: {
      type: String,
    },
    disabledBorderColor: {
      type: String,
    },
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const isCustom = computed(() => {
      return (
        props.bgColor ||
        props.textColor ||
        props.borderColor ||
        props.bgHoverColor ||
        props.textHoverColor ||
        props.borderHoverColor ||
        props.bgActiveColor ||
        props.textActiveColor ||
        props.borderActiveColor ||
        props.disabledBgColor ||
        props.disabledTextColor ||
        props.disabledBorderColor
      );
    });

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
            'andi-button--custom': isCustom.value,
          },
        ]}
        style={{
          '--andi-custom--button-bg': props.bgColor,
          '--andi-custom--button-text': props.textColor,
          '--andi-custom--button-border': props.borderColor,
          '--andi-custom-button-bg-hover-color': props.bgHoverColor,
          '--andi-custom-button-text-hover-color': props.textHoverColor,
          '--andi-custom-button-border-hover-color': props.borderHoverColor,
          '--andi-custom-button-bg-active-color': props.bgActiveColor,
          '--andi-custom-button-text-active-color': props.textActiveColor,
          '--andi-custom-button-border-active-color': props.borderActiveColor,
          '--andi-custom--button-disabled-bg': props.disabledBgColor,
          '--andi-custom--button-disabled-text': props.disabledTextColor,
          '--andi-custom--button-disabled-border': props.disabledBorderColor,
        }}
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
