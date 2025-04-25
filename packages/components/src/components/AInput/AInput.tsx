import { computed, defineComponent, ref, watch } from 'vue';
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
    const showPassword = ref(false);

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
    watch(
      () => props.modelValue,
      () => {
        validate();
      },
    );

    const id = computed(() => {
      return `${Math.random().toString(36).substring(2, 15)}-${props.label}`;
    });

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const computedInputType = computed(() => {
      if (props.type === 'password' && showPassword.value) {
        return 'text';
      }
      return props.type;
    });

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
              type={computedInputType.value}
              placeholder={props.disabled ? '' : props.placeholder}
              id={id.value}
              disabled={props.disabled}
              value={props.modelValue}
              onInput={changeHandler}
            />
            {props.type === 'password' ? (
              <div class="icon-wrapper" onClick={togglePasswordVisibility}>
                {!showPassword.value ? (
                  <svg
                    id="visible"
                    class={['a-input--icon visible', `a-input--icon--${props.size}`]}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      class="cls-1"
                      d="m12,5c-5.73,0-9,7-9,7,0,0,3.27,7,9,7s9-7,9-7c0,0-3.27-7-9-7Zm0,13c-4.25,0-7.09-4.57-7.87-6,.78-1.43,3.61-6,7.87-6s7.09,4.57,7.87,6c-.78,1.43-3.61,6-7.87,6Z"
                    />
                    <path
                      class="cls-1"
                      d="m12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4,4-1.79,4-4-1.79-4-4-4Zm0,7c-1.65,0-3-1.35-3-3s1.35-3,3-3,3,1.35,3,3-1.35,3-3,3Z"
                    />
                  </svg>
                ) : (
                  <svg
                    id="invisible"
                    class={['a-input--icon invisible', `a-input--icon--${props.size}`]}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      class="cls-1"
                      d="m14.95,11.54l.99.99c.02-.18.05-.35.05-.53,0-2.21-1.79-4-4-4-.18,0-.36.03-.53.05l.99.99c1.28.2,2.29,1.21,2.49,2.49Z"
                    />
                    <path
                      class="cls-1"
                      d="m3.65,4.35l2.93,2.93c-2.31,2.04-3.57,4.72-3.57,4.72,0,0,3.27,7,9,7,1.8,0,3.36-.7,4.65-1.65l3,3,.71-.71L4.35,3.65l-.71.71Zm8.35,13.65c-4.25,0-7.09-4.57-7.87-6,.44-.8,1.53-2.59,3.16-4.01l1.57,1.57c-.53.67-.85,1.51-.85,2.44,0,2.21,1.79,4,4,4,.92,0,1.77-.32,2.44-.85l1.49,1.49c-1.12.8-2.43,1.37-3.93,1.37Zm1.72-3.57c-.49.35-1.07.57-1.72.57-1.65,0-3-1.35-3-3,0-.65.22-1.23.57-1.72l4.15,4.15Z"
                    />
                    <path
                      class="cls-1"
                      d="m12,5c-1.07,0-2.05.24-2.94.64l.77.77c.68-.26,1.4-.41,2.18-.41,4.25,0,7.09,4.57,7.87,6-.31.56-.93,1.59-1.82,2.64l.71.71c1.45-1.7,2.23-3.35,2.23-3.35,0,0-3.27-7-9-7Z"
                    />
                  </svg>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  },
});
