import AdminProductsPage from "./AdminProductsPage";
import AdminUsersPages from "./AdminUsersPage";
function AdminPanel() {
    // Vérifier l'état de l'authentification de l'utilisateur administrateur

    return (
        <div>
            <p> Panel d'admin</p>
            <AdminProductsPage />
            <AdminUsersPages />
        </div>
    );
}
export default AdminPanel;