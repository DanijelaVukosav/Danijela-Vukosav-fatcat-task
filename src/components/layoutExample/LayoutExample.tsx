import { FC } from 'react';

import { PageLayout } from '@homework-task/components/common/PageLayout';
import {
    ComponentsEnum,
    PageLayoutProps,
} from '@homework-task/components/common/typesPageLayout';

const data: PageLayoutProps = {
    sections: [
        {
            type: 'layoutSection',
            props: 'bg-emerald-400', //flex justify-center items-center
            components: [
                {
                    type: ComponentsEnum.FORM_EXAMPLE,
                    props: {},
                },
                {
                    type: ComponentsEnum.CARDS,
                    props: {
                        cards: [
                            {
                                title: 'Fat cat 1',
                                image: './media/cats/cat_1.png',
                                description: 'Fat cat description',
                                background: '#f0f0f0',
                                onClick: undefined,
                                buttonText: 'Read more',
                            },
                            {
                                title: 'Fat cat 2',
                                image: './media/cats/cat_2.png',
                                description: 'Fat cat description',
                                background: '#e0e0e0',
                                onClick: undefined,
                                buttonText: 'Learn more',
                            },
                            {
                                title: 'Fat cat 3',
                                image: './media/cats/cat_3.png',
                                description: 'Fat cat description',
                                background: '#d0d0d0',
                                onClick: undefined,
                                buttonText: 'Explore',
                            },
                        ],
                    },
                },
            ],
        },
        {
            type: 'layoutSection',
            props: 'bg-gray-400',
            components: [
                {
                    type: ComponentsEnum.PANEL_SHOWCASE,
                    props: {
                        items: [
                            {
                                title: 'Panel 1',
                                description:
                                    'This is the description for panel 1.',
                                image: './media/panel/shape1.svg',
                            },
                            {
                                title: 'Panel 2',
                                description:
                                    'This is the description for panel 2.',
                                image: './media/panel/shape2.svg',
                            },
                            {
                                title: 'Panel 3',
                                description:
                                    'This is the description for panel 3.',
                                image: './media/panel/shape3.svg',
                            },
                        ],
                    },
                },
                {
                    type: ComponentsEnum.USERS_LIST,
                    props: {},
                },
            ],
        },
    ],
};

export const LayoutExample: FC = () => {
    return <PageLayout sections={data.sections} />;
};
