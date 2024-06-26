import Link from "next/link";
export default function NavBar() {
    return (
      <nav className="bg-zinc-500 px-10">
      <div className="container mx-auto flex justify-between text-white items-center py-4">
        <h3 className=" text-3xl">NextFirebaseZod</h3>
        <ul>
            <li>
                <Link href={'/addpersona'}>
                    Nuevo registro
                </Link>
            </li>

        </ul>
        </div>
      </nav>
    );
  }
  