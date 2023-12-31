import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/users/UserList";
import getUsers from "../actions/getUsers";


export default async function UsersLayout({
  children
}: {
  children: React.ReactNode,
}) {

  const users = await getUsers()

  return (
    // @ts-ignore
    <Sidebar>
      <UserList items={users} />
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  );
}