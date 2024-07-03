import { FC } from 'react';

import { Cards, CardsProps } from '@homework-task/components/Cards';
import { FormExample } from '@homework-task/components/formExample/FormExample';
import {
    PanelShowcase,
    PanelShowcaseProps,
} from '@homework-task/components/PanelShowcase';
import { UserList } from '@homework-task/components/users/UsersList';

type ComponentPropsType = CardsProps & PanelShowcaseProps;

export enum ComponentsEnum {
    CARDS = 'CARDS',
    PANEL_SHOWCASE = 'PANEL_SHOWCASE',
    FORM_EXAMPLE = 'FORM_EXAMPLE',
    USERS_LIST = 'USERS_LIST',
}

export const componentMap: Record<ComponentsEnum, FC<ComponentPropsType>> = {
    [ComponentsEnum.CARDS]: Cards,
    [ComponentsEnum.PANEL_SHOWCASE]: PanelShowcase,
    [ComponentsEnum.FORM_EXAMPLE]: FormExample,
    [ComponentsEnum.USERS_LIST]: UserList,
};

export interface ComponentConfig {
    type: ComponentsEnum;
    props: unknown;
}

export interface SectionConfig {
    type: string;
    props: string;
    components: ComponentConfig[];
}

export interface PageLayoutProps {
    sections: SectionConfig[];
}
