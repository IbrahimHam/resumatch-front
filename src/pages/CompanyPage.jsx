import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon, Merge, Users, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const CompanyPage = () => {
  const { user, token } = React.useContext(AuthContext);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/company/${user.company_id}`
        );
        const data = response.data;
        setCompany(data.data.company);
      } catch (error) {
        console.error(error);
      }
    };
    if (user.company_id) {
      getCompany();
    }
  }, [user.company_id]);

  return (
    <>
      <main className="container mx-auto px-4 py-8 mt-12">
        <Alert className="w-full max-w-3xl mx-auto dark:border-gray-500/50 border-gray-500/20 shadow-md mt-10 mb-10">
          {company && company != null ? (
            <>
              <AlertTitle>Your Company</AlertTitle>
              <AlertDescription>
                <div className="flex flex-col md:flex-row items-center gap-6 mt-5">
                  <img
                    src={`http://localhost:3000${company.image}`}
                    alt="Company Logo"
                    className="rounded-full w-24 h-24 object-cover border-4 border-primary"
                  />
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {company.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <Badge className="flex items-center gap-1 bg-blue-400 text-white dark:bg-blue-600">
                        <Users className="h-4 w-4" />
                        <span>{company.employeesNumber} employees</span>
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-400 text-white dark:bg-blue-600"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>{company.location}</span>
                      </Badge>
                      <Badge className="flex items-center gap-1 bg-blue-400 text-white dark:bg-blue-600">
                        <Globe className="h-4 w-4" />
                        <a
                          href={`${company.website}`}
                          className="hover:underline "
                        >
                          {company.website}
                        </a>
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 p-2">
                  {company.description}
                </p>
              </AlertDescription>
            </>
          ) : (
            <>
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                <p>
                  You have not joined any company yet. Please create a new
                  company or join to an existing one.
                </p>
              </AlertDescription>
            </>
          )}
        </Alert>
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
            <Link to="/company/create" className="w-full">
              <Card className="flex flex-col justify-center items-center h-full cursor-pointer shadow-xl hover:bg-gray-500/20 hover:text-black hover:dark:bg-gray-600/50 hover:dark:text-white border-gray-500/50 transition-colors">
                <CardContent className="flex flex-col items-center p-6">
                  <PlusIcon className="w-16 h-16 mb-4 text-primary" />
                  <CardTitle className="text-center">
                    Create New Company
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
            <Link to="/company/connect" className="w-full">
              <Card className="flex flex-col justify-center items-center h-full cursor-pointer shadow-xl hover:bg-gray-500/20 hover:text-black hover:dark:bg-gray-600/50 hover:dark:text-white border-gray-500/50 transition-colors">
                <CardContent className="flex flex-col items-center p-6">
                  <Merge className="w-16 h-16 mb-4 text-primary" />
                  <CardTitle className="text-center">
                    Join To A Company
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default CompanyPage;
