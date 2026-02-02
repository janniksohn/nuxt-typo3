<script>
import { h, resolveComponent } from "vue";
const T3CeShortcut = (props) => {
  return h("div", null, [
    h(resolveComponent("T3Renderer"), {
      content: props.shortcut
    })
  ]);
};
export default T3CeShortcut;
</script>
