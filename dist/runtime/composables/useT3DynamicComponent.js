import { resolveDynamicComponent } from "vue";
import { pascalCase } from "scule";
export const useT3DynamicComponent = ({
  type,
  prefix,
  mode
} = {
  type: "Default",
  prefix: "T3Ce",
  mode: "Lazy"
}) => {
  const componentName = (mode || "Lazy") + (prefix || "T3Ce") + pascalCase(type || "default");
  const component = resolveDynamicComponent(componentName);
  if (typeof component === "string") {
    return resolveDynamicComponent(`${prefix}Default`);
  }
  return component;
};
export const useT3DynamicBl = (type = "default") => {
  return useT3DynamicComponent({ type, prefix: "T3Bl", mode: "" });
};
export const useT3DynamicCe = (type = "default") => {
  return useT3DynamicComponent({ type, prefix: "T3Ce", mode: "" });
};
