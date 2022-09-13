export const BROWSER_CONTENTS_AREA_TYPE = {
  DEFAULT : "default",                                //just input side margin
  DASHBOARD : "dashboard",                            // with dashboard nav side bar
  DASHBOARD_WITH_WHITE_BOX : "dashboard_white_box",   //  with dashboard nav side bar and white contents box
  DASHBOARD_WITHOUT_PADDING : "dashboard_without_padding",   //  with dashboard nav side bar and no padding contents area
};

/**
 * TextInput.jsx or TextInputSearch.jsx status
 */
export const INPUT_STATUS = {
  DEFAULT : 1,
  FOCUSED : 2,
  ERROR: 3,
  DISABLED: 4,
};

/**
 * Toast.jsx type
 */
export const TOAST_TYPE = {
  info : 1,
  success: 2,
  error : 3,
}
