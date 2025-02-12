<template>
  <p-content class="schema-form-property-any-of">
    <h3 class="schema-form-property-any-of__section-header">
      {{ title }}
    </h3>

    <p-button-group v-model="selected" :options="options" small />

    <p-label class="schema-form-property-any-of__fields p-background" :description="description">
      <template v-if="displayedDefinition.meta && displayedDefinition.meta.component">
        <SchemaFormProperty :property="displayedDefinition" :prop-key="propKey" />
      </template>

      <template v-else-if="isObject">
        <p-content>
          <template v-for="(subProperty, key) in displayedDefinition.properties" :key="key">
            <SchemaFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty!" />
          </template>
        </p-content>
      </template>
      <template v-else>
        <SchemaFormProperty :property="displayedDefinition" :prop-key="propKey" />
      </template>
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useField } from 'vee-validate'
  import { computed, ref, watch } from 'vue'
  import SchemaFormProperty from '@/components/SchemaFormProperty.vue'
  import { getSchemaPropertyDefaultValue, getSchemaValueAnyOfDefinitionIndex } from '@/services/schemas'
  import { SchemaPropertyAnyOf } from '@/types/schemas'

  const props = defineProps<{
    propKey: string,
    property: SchemaPropertyAnyOf,
  }>()

  const { value, setValue } = useField(props.propKey)
  const selected = ref(getSchemaValueAnyOfDefinitionIndex(props.property, value.value) ?? 0)
  const definitions = computed(() => props.property.anyOf)
  const displayedDefinition = computed(() => definitions.value[selected.value] ?? {})
  const title = computed(() => props.property.title ?? props.propKey.split('.').pop())
  const isObject = computed(() => displayedDefinition.value.type == 'object')
  const description = computed(() => props.property.description ?? displayedDefinition.value.description)

  const options = computed<ButtonGroupOption[]>(() => definitions.value.map((prop, index) => ({
    label: prop.title ?? prop.alias ?? prop.format ?? prop.type ?? '',
    value: index,
  })))

  const selectedDefinitionValueMap = definitions.value.map(definition => getSchemaPropertyDefaultValue(definition))

  watch(selected, selected => {
    setValue(selectedDefinitionValueMap[selected])
  })

  watch(value, value => {
    selectedDefinitionValueMap[selected.value] = value
  }, { immediate: true })
</script>

<style>
.schema-form-property-any-of__section-header { @apply
  text-lg
  font-semibold
}

.schema-form-property-any-of__fields { @apply
  p-4
  rounded-default
}
</style>