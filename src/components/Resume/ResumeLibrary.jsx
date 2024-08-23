import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlusIcon, EditIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function ResumeLibrary() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, token } = React.useContext(AuthContext);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const getResumes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/templates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setResumes(data.data.templates);
        console.log(response.data.data.templates);
      } catch (error) {
        console.error(error);
      }
    };
    getResumes();
  }, [token]);

  const handleDelete = async (templateId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/delete-template/${templateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setResumes((prevResumes) =>
          prevResumes.filter((resume) => resume._id !== templateId)
        );
        toast.success("Deleted successfully");
      } else {
        toast.error("Failed to delete resume");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the resume");
      console.error(error);
    }
  };

  const templates = [
    {
      id: 1,
      title: "Professional",
      image: "https://placehold.co/200x150?text=Professional",
    },
    {
      id: 2,
      title: "Creative",
      image: "https://placehold.co/200x150?text=Creative",
    },
    {
      id: 3,
      title: "Modern",
      image: "https://placehold.co/200x150?text=Modern",
    },
    {
      id: 4,
      title: "Simple",
      image: "https://placehold.co/200x150?text=Simple",
    },
    {
      id: 5,
      title: "Executive",
      image: "https://placehold.co/200x150?text=Executive",
    },
  ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-2">My Resumes</h1>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-6">
          Create a new resume or view, edit, and delete existing resumes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Card className="flex flex-col justify-center items-center h-full cursor-pointer shadow-xl hover:bg-gray-500/20 hover:text-black hover:dark:bg-gray-600/50 hover:dark:text-white border-gray-500/50 transition-colors">
                <CardContent className="flex flex-col items-center p-6">
                  <PlusIcon className="w-16 h-16 mb-4 text-primary" />
                  <CardTitle className="text-center">
                    Create New Resume
                  </CardTitle>
                </CardContent>
              </Card>
            </DrawerTrigger>
            <DrawerContent className="bg-slate-50 dark:bg-slate-900 border-gray-500/50 ">
              <div className="mx-auto w-full max-w-4xl">
                <DrawerHeader>
                  <DrawerTitle>Choose a Template</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <Carousel className="w-full max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto relative">
                    <CarouselContent>
                      {templates.map((template) => (
                        <CarouselItem
                          key={template.id}
                          className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >
                          <div className="p-1">
                            <Link to={`/create-resume/${template.id}`}>
                              <Card className="flex flex-col group cursor-pointer overflow-hidden border-gray-500/50 ">
                                <CardHeader className="relative p-0 space-y-0">
                                  <img
                                    src={`/templates/${template.id}.png`}
                                    alt={template.title}
                                    className="w-full h-52 object-cover object-top"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-sm font-medium">
                                      Select this template
                                    </span>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <CardTitle className="text-center p-0 mt-5">
                                    {template.title}
                                  </CardTitle>
                                </CardContent>
                              </Card>
                            </Link>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 lg:left-[-50px]" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 lg:right-[-50px]" />
                  </Carousel>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {resumes &&
            resumes.length > 0 &&
            resumes.map((resume, index) => (
              <Card
                key={resume._id}
                className="flex flex-col border-gray-500/50 p-2"
              >
                <CardHeader className="py-2 px-2">
                  <img
                    src={`/templates/${resume.templateLink}.png`}
                    alt={resume.title}
                    className="w-full h-32 object-cover object-top rounded-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-2">
                  <Link
                    to={`/create-resume/${resume.templateLink}/${resume._id}`}
                  >
                    <CardTitle className="text-lg mb-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 transition-colors">
                      {user.fullName} Resume #{index + 1}
                    </CardTitle>
                  </Link>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Last edit: {moment(resume.updatedAt).fromNow()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between p-2">
                  <Link
                    to={`/create-resume/${resume.templateLink}/${resume._id}`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1 bg-blue-400 border-none text-white hover:bg-blue-600 hover:dark:bg-blue-600/50 transition-colors"
                    >
                      <EditIcon className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 bg-red-500 border-none text-white hover:bg-red-600 hover:dark:bg-red-600/50 transition-colors"
                      >
                        <TrashIcon className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogPortal>
                      <AlertDialogOverlay className="fixed inset-0 bg-black bg-opacity-50 " />
                      <AlertDialogContent className="fixed top-1/2 left-1/2 max-w-md bg-white dark:bg-gray-800 p-6 border-gray-500/50 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                        <AlertDialogTitle className="text-lg font-bold">
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          This action cannot be undone. Do you want to delete
                          this resume?
                        </AlertDialogDescription>
                        <div className="mt-4 flex justify-end gap-4">
                          <AlertDialogCancel asChild>
                            <Button className="bg-gray-200 dark:bg-gray-600 border-none">
                              Cancel
                            </Button>
                          </AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button
                              className="bg-red-500 text-white border-none hover:bg-red-600 dark:hover:bg-red-600/50"
                              onClick={() => handleDelete(resume._id)}
                            >
                              Delete
                            </Button>
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialogPortal>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
