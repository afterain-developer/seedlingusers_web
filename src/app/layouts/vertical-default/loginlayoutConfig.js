import {
    SIDEBAR_ANCHOR_POSITIONS,
    SIDEBAR_SCROLL_TYPES,
    SIDEBAR_STYLES,
    SIDEBAR_VARIANTS,
    SIDEBAR_VIEWS
} from "@jumbo/utils/constants/layout";

const loginlayoutConfig = {
    sidebar: {
        open: false,
        hide: true,
        variant: SIDEBAR_VARIANTS.PERSISTENT,
        style: SIDEBAR_STYLES.FULL_HEIGHT,
        view: SIDEBAR_VIEWS.FULL,
        scrollType: SIDEBAR_SCROLL_TYPES.FIXED,
        anchor: SIDEBAR_ANCHOR_POSITIONS.LEFT,
    },
    header: {
        hide: true,
        fixed: false,
    },
    footer: {
        hide: false,
    },
    root: {
    },
    content: {
        sx: {
            py: 4,
            px: { lg: 6, xs: 4 }
        }
    }
};

export default loginlayoutConfig;