import { getModuleSettings } from "../integration/rest";
import type { ChoiceSetting, ChooseSetting, ConfigurableSetting } from "../integration/types";
import { mt } from "../renamer";

let speed = 50;

export function translateName(name: string): string {
    console.log(name)
    if (!mt.has(name)) return name;
    return mt.get(name);
}

export async function getPrefixAsync(name: string) {
    const settings = await getModuleSettings(name);
    let value = "";
    let mode = settings.value.find(n => n.valueType == "CHOICE");
    if (mode != null) {
        const cMode = mode as ChoiceSetting;
        value = " " + cMode.active;
    } else {
        // Mostly killaura and etc put choice settings in configurable, so we need this.
        mode = settings.value.find(n => n.valueType == "CONFIGURABLE");
        if (mode != null) {
            const cMode = mode as ConfigurableSetting;
            const mode1 = cMode.value.find(n => n.valueType == "CHOICE");
            const mode2 = cMode.value.find(n => n.valueType == "CHOOSE");
            if (mode1 != null) {
                const cMode1 = mode1 as ChoiceSetting;
                value = " " + cMode1.active;
            } else {
                if (mode2 != null) {
                    const cMode1 = mode2 as ChooseSetting;
                    value = " " + cMode1.value;
                }
            }
        }
    }

    if (value == undefined) value = "";

    return Promise.resolve(value);
}

interface RGBColor {
    r: number;
    g: number;
    b: number;
}

let progress = 0;
const tSpeed = (0.04 / 20) * speed;

export function arraylistGradient() {
    const arraylist = document.getElementById("arraylist");
    if (arraylist == null) return;
    var color1 = window.getComputedStyle(arraylist).getPropertyValue("--accent-color").trim();
    var color2 = window.getComputedStyle(arraylist).getPropertyValue("--accent-color-2").trim();
    const modules = arraylist.children as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < modules.length; i++) {
        const element = modules[i];
        if (element.id != "module-name") continue;
        const percentage = 1 - (i / modules.length) + (.5 * Math.sin(.5 * i + progress));;
        const rgb = colorInterpolate(color1, color2, percentage);
        element.style.color = `rgb( ${rgb.r}, ${rgb.g}, ${rgb.b})`;
        
        const sidebar = element.children as HTMLCollectionOf<HTMLElement>;
        if (sidebar.length > 1) {
            const bar = sidebar[1];
            bar.style.borderColor =  element.style.color;
        }
    }

    progress += tSpeed;
    if (progress >= Math.PI * 2) {
        progress = 0;
    }
}

export function getRgb(color: string): RGBColor {
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      throw new Error(`Invalid color format: ${color}`);
    }
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    };
}
  
// taken from stackoverflow :3
// https://stackoverflow.com/questions/66123016/interpolate-between-two-colours-based-on-a-percentage-value
export function colorInterpolate(colorA: string, colorB: string, interpolation: number): RGBColor {
    const rgbA = getRgb(colorA);
    const rgbB = getRgb(colorB);
  
    interpolation = Math.min(1, Math.max(0, interpolation));
  
    const interpolateComponent = (prop: keyof RGBColor) =>
      Math.round(rgbA[prop] * (1 - interpolation) + rgbB[prop] * interpolation);
  
    return {
      r: interpolateComponent('r'),
      g: interpolateComponent('g'),
      b: interpolateComponent('b'),
    };
}

setInterval(arraylistGradient, speed)