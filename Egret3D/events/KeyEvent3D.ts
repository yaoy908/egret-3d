


module egret3d {

    /**
     * @language zh_CN
     * 按键码
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum KeyCode {
        Key_BackSpace = 8,
        Key_Tab = 9,
        Key_Clear = 12,
        Key_Enter = 13,
        Key_Shift_L = 16,
        Key_Control_L = 17,
        Key_Alt_L = 18,
        Key_Pause,
        Key_CapsLock = 20,
        Key_Escape,
        Key_Space,
        Key_Prior,
        Key_Next,
        Key_End = 35,
        Key_Home = 36,
        Key_Left = 37,
        Key_Up = 38,
        Key_Right = 39,
        Key_Down = 40,
        Key_Select,
        Key_Print,
        Key_Execute,
        Key_Insert = 45,
        Key_Delete = 46,
        Key_Help,
        Key_0 = 48,
        Key_1,
        Key_2,
        Key_3,
        Key_4,
        Key_5,
        Key_6,
        Key_7,
        Key_8,
        Key_9,

        Key_A = 65,
        Key_B,
        Key_C,
        Key_D,
        Key_E,
        Key_F,
        Key_G,
        Key_H,
        Key_I,
        Key_J,
        Key_K,
        Key_L,
        Key_M,
        Key_N,
        Key_O,
        Key_P,
        Key_Q,
        Key_R,
        Key_S,
        Key_T,
        Key_U,
        Key_V,
        Key_W,
        Key_X,
        Key_Y,
        Key_Z,
        Key_KP_0 = 96,
        Key_KP_1,
        Key_KP_2,
        Key_KP_3,
        Key_KP_4,
        Key_KP_5,
        Key_KP_6,
        Key_KP_7,
        Key_KP_8,
        Key_KP_9 = 105,
        Key_Multiply = 106,
        Key_Add = 107,
        Key_Separator = 108,
        Key_Subtract = 109,
        Key_Decimal = 110,
        Key_Divide = 111,
        Key_F1 = 112,
        Key_F2 = 113,
        Key_F3 = 114,
        Key_F4,
        Key_F5,
        Key_F6,
        Key_F7,
        Key_F8,
        Key_F9,
        Key_F10,
        Key_F11,
        Key_F12 = 123,
        Key_F13,
        Key_F14,
        Key_F15,
        Key_F16,
        Key_F17,
        Key_F18,
        Key_F19,
        Key_F20,
        Key_F21,
        Key_F22,
        Key_F23,
        Key_F24,

        Key_Num_Lock,
        Key_Scroll_Lock,
    }

    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * KeyEvent3D 按键事件
    * @includeExample events/KeyEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class KeyEvent3D extends Event3D {

        /**
         * @language zh_CN
         * KEY_CLICK 常量定义 onKeyClick 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static KEY_CLICK: string = "onKeyClick";

        /**
         * @language zh_CN
         * KEY_DOWN 常量定义 onKeyDown 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static KEY_DOWN: string = "onKeyDown";

        /**
         * @language zh_CN
         * KEY_UP 常量定义 onKeyUp 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static KEY_UP: string = "onKeyUp";

        
        /**
         * @language zh_CN
         * 按键code值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public keyCode: number = 0;
    }
}