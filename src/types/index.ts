import { IconType } from "react-icons/lib";

export type TCollectionCard = {
    index: string;
    name: string;
    microcopy: string;
    src: string;
    alt: string;
    width: string;
};

export type TMaterialPoint = {
    stat: string;
    title: string;
    copy: string
}

export type TNavLink = {
    href: string;
    label: string;
};

export type TContactSocial = {
    href: string;
    label: string;
    icon: IconType;
};

export type TContactLink = {
    href: string | null;
    external?: boolean;
    icon: IconType;
    label: string;
    value: string;
};

export type TQA = { 
    question: string; 
    answer: string 
}