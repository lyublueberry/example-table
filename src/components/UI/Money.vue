<template>
  <input type="text" v-model.trim="valueInput" class="ui-money" />
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
        return this.value.toLocaleString('ru-RU');
      },
      set(value) {
        let formateValue = value;
        if (/[а-яё]+|[a-z]+|[A-Z]+|[А-ЯЁ]/g.test(formateValue)) {
          formateValue.replace('');
        } else {
          formateValue = (parseFloat(formateValue)).replace(',', '.');
        }
        if (value !== formateValue) {
          this.$emit('input', formateValue);
        }
      },
    },
  },
};
</script>
