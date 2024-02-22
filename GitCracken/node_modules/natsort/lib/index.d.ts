export declare type OptionsType = {
    desc?: boolean;
    insensitive?: boolean;
};
export default function natsort(options?: OptionsType): (a: string | number, b: string | number) => number;
