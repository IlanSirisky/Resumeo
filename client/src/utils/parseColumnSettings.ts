import { IDropDownTypes } from "../types/dropDownType";

export const parseSettingsStrToOptions = (
  settingsStr: string
): IDropDownTypes[] => {
  const settings = JSON.parse(settingsStr);
  const labels = settings.labels || {};

  return Object.entries(labels).map(([key, label]) => ({
    value: key,
    label: label as string,
  }));
};

export const parseSettingsStrToLabels = (settingsStr: string): string[] => {
  const settings = JSON.parse(settingsStr);
  const labels = settings.labels || {};

  return Object.values(labels);
};
