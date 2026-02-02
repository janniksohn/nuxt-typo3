<template>
  <div
    :class="`t3-ce-table--${tableClass}`"
    class="t3-ce-table"
  >
    <T3CeHeader v-bind="props" />
    <table>
      <caption v-if="tableCaption">
        {{
          tableCaption
        }}
      </caption>
      <thead v-if="thead?.length">
        <tr>
          <th
            v-for="(col, colKey) in thead"
            :key="colKey"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody v-if="tbody">
        <tr
          v-for="(row, rowKey) in tbody"
          :key="rowKey"
        >
          <component
            :is="tableHeaderPosition === 2 && colKey === 0 ? 'th' : 'td'"
            v-for="(col, colKey) in row"
            :key="colKey"
          >
            {{ col }}
          </component>
        </tr>
      </tbody>
      <tfoot v-if="tfoot?.length">
        <tr>
          <td
            v-for="(col, colKey) in tfoot"
            :key="colKey"
          >
            {{ col }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { useT3CeTable } from "./useT3CeTable";
const props = defineProps({
  tableCaption: { type: String, required: true },
  tableHeaderPosition: { type: Number, required: true },
  tableClass: { type: String, required: true },
  tableTfoot: { type: String, required: true },
  bodytext: { type: Array, required: true, default: () => [] },
  header: { type: String, required: false },
  headerLayout: { type: Number, required: false },
  headerPosition: { type: String, required: false },
  headerLink: { type: [Object, String], required: false },
  subheader: { type: String, required: false },
  uid: { type: Number, required: false },
  index: { type: Number, required: false },
  appearance: { type: Object, required: false }
});
const { thead, tbody, tfoot } = useT3CeTable(props);
</script>
