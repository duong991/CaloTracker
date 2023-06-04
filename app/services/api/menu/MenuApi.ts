// import { Api } from "../api";
// import { GeneralApiProblem } from "../apiProblem";
// import { MenuAttributes } from "../../../interfaces/table-server.interface";
// import { ApiResponse } from "apisauce";

// /**

// Quản lý các yêu cầu API liên quan đến Menu.
// */
// export class MenuApi {
//     private api: Api;

//     constructor(api: Api) {
//         this.api = api;
//     }

//     /**
    
//     Lấy danh sách các menu.
//     */
//     async getMenus(): Promise<{ kind: "ok"; data: MenuAttributes[] } | GeneralApiProblem> {
//         try {
//             const response: ApiResponse<MenuAttributes[]> = await this.api.apisauce.get("/menus");
//             if (response.ok) {
//                 const menus = response.data;
//                 return { kind: "ok", data: menus };
//             } else {
//                 return { kind: "bad-data" };
//             }
//         } catch (error) {
//             return { kind: "bad-data" };
//         }
//     }

//     /**
    
//     Tạo một menu mới.
//     */
//     async createMenu(menu: MenuAttributes): Promise<{ kind: "ok"; menu: MenuAttributes } | GeneralApiProblem> {
//         try {
//             const response = await this.api.apisauce.post("/menus", menu);
//             if (response.ok) {
//                 const createdMenu = response.data;
//                 return { kind: "ok", menu: createdMenu };
//             } else {
//                 return { kind: "bad-data" };
//             }
//         } catch (error) {
//             return { kind: "bad-data" };
//         }
//     }

//     /**
    
//     Cập nhật thông tin một menu.
//     */
//     async updateMenu(menuId: string, updatedMenu: MenuAttributes): Promise<{ kind: "ok"; menu: MenuAttributes } | GeneralApiProblem> {
//         try {
//             const response = await this.api.apisauce.put(`/menus/${menuId}`, updatedMenu);
//             if (response.ok) {
//                 const updatedMenu = response.data;
//                 return { kind: "ok", menu: updatedMenu };
//             } else {
//                 return { kind: "bad-data" };
//             }
//         } catch (error) {
//             return { kind: "bad-data" };
//         }
//     }

//     /**
    
//     Xóa một menu.
//     */
//     async deleteMenu(menuId: string): Promise<{ kind: "ok" } | GeneralApiProblem> {
//         try {
//             const response = await this.api.apisauce.delete(`/menus/${menuId}`);
//             if (response.ok) {
//                 return { kind: "ok" };
//             } else {
//                 return { kind: "bad-data" };
//             }
//         } catch (error) {
//             return { kind: "bad-data" };
//         }
//     }
// }