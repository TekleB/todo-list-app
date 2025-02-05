import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

const TodoListPage = () => {
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/"
            className="text-emerald-600 hover:text-emerald-700 flex items-center"
          >
            <ChevronLeft className="mr-2" /> Back to Todo List
          </Link>
        </div>
      </section>

      <section className="">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-left">
                <h1 className="text-3xl font-bold  text-emerald-700 flex ">
                  consectetur
                  <Badge
                    variant="outline"
                    className="bg-orange-500 text-white ml-1 -mb-3 self-start"
                  >
                    Active
                  </Badge>
                </h1>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-emerald-700 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4 tracking-wide">
                  Dolor irure nulla consequat esse qui sint ut veniam anim
                  commodo. Veniam in ex sit sunt sunt laborum sit labore ad.
                  Exercitation occaecat labore id dolore Lorem cupidatat duis in
                  minim id occaecat elit Lorem. Excepteur nostrud fugiat qui ut
                  irure nisi. Anim incididunt proident quis velit. In esse
                  cillum nulla dolor do cillum excepteur ut mollit voluptate
                  amet consectetur. Culpa in in et esse adipisicing esse
                </p>

                <h3 className="text-emerald-700 font-bold mb-2 tracking-wide">
                  Due Date
                </h3>

                <p className="mb-4">2020-01-16T03:22:22 -03:00</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Manage Todo</h3>
                <Link
                  to={`/edit-job/67a321e67157e251a8e3c125`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default TodoListPage;
