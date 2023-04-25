<template>
  <input type="text" v-model.trim="valueInput" @keypress="isNumber($event)" @blur="blur" class="ui-money" />
</template>

<script>
export default {
  name: 'UiMoney',
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    valueInput: {
      get() {
        return this.value;
      },
      set(value) {
        const formattedValue = this.formatValue(value);
        this.$emit('input', formattedValue);
      },
    },
  },
  methods: {
    blur() {
      this.valueInput = this.valueInput.toFixed(2);
    },
    formatValue(val) {
      const formatted = val.replace(',', '.');
      const floatted = parseFloat(formatted);
      return floatted;
    },
    isNumber(evt) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
      const keyPressed = evt.key;

      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },
  },
};
</script>
