import { computed, defineComponent, watch } from 'vue';
// import { AIcon } from '@/components/AIcon/AIcon';

import './AInput.scss';

type Size = 'sm' | 'md' | 'lg';

export const AInput = defineComponent({
  name: 'AInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    customClass: {
      type: String,
      default: '',
    },
    size: {
      type: String as () => Size,
      default: 'md',
      validator: (value: string) => {
        return ['sm', 'md', 'lg'].includes(value);
      },
    },
    type: {
      type: String,
      default: 'text',
      validator: (value: string) => {
        return ['text', 'email', 'password', 'number'].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    rules: {
      type: Array as () => Array<(value: string) => boolean>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const changeHandler = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
    };

    const validate = () => {
      for (const rule of props.rules) {
        if (!rule(props.modelValue || '')) {
          return false;
        }
      }
      return true;
    };

    const id = computed(() => {
      return `${Math.random().toString(36).substring(2, 15)}-${props.label}`;
    });

    watch(
      () => props.modelValue,
      () => {
        validate();
      },
    );

    expose({
      validate,
    });
    return () => (
      <div class={[`a-input--container`, `a-input--container--${props.size}`]}>
        <div class="a-input-label--wrapper">
          <label class="a-input-label" for={id.value}>
            {props.label}
          </label>
          {props.caption && <span class="a-input-caption">{props.caption}</span>}
        </div>
        <div class="a-input--wrapper">
          <div class="a-input--relative">
            <input
              class={[`a-input--input`, `a-input--${props.size}`, props.customClass]}
              type={props.type}
              placeholder={props.disabled ? '' : props.placeholder}
              id={id.value}
              disabled={props.disabled}
              value={props.modelValue}
              onInput={changeHandler}
            />
          </div>
        </div>
        {/* <AIcon name="VisibleIcon" size={16} color="#333" /> */}
      </div>
    );
  },
});
