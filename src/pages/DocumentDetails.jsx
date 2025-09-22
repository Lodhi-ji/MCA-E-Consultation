import React, { useState } from "react";
import { Home, Download, Printer, Info } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommentModal } from "@/components/modals/CommentModal";
import { useToast } from "@/hooks/use-toast";

const DocumentDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: "Home", href: "#" },
    { label: "Additional Services", href: "#" },
    { label: "E-Consultation" }
  ];

  const handleSave = () => {
    toast({
      title: "Draft Saved",
      description: "Your comment has been saved as a draft."
    });
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    toast({
      title: "Success!",
      description: "Your comments have been submitted for review. Thank you for your participation.",
      variant: "default"
    });
    setComment("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-4">
          <Home className="h-5 w-5 mr-2" />
          <h1 className="text-2xl font-bold">E-Consultation</h1>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          Establishment of Indian Multi-Disciplinary Partnership (MDP) firms by the Govt of India
        </h2>

        <Tabs defaultValue="document-details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="public-notice">Public Notice</TabsTrigger>
            <TabsTrigger value="instruction-kit">Instruction Kit</TabsTrigger>
            <TabsTrigger value="document-details">Document details and comments</TabsTrigger>
          </TabsList>

          <TabsContent value="public-notice" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="bg-black rounded-lg p-4 min-h-96">
                  <div className="bg-white rounded p-4 h-full">
                    <div className="text-center">
                      <p className="text-sm mb-4">(Randhir Kumar)</p>
                      <p className="text-sm mb-2">Under Secretary to the Government of India</p>
                      <p className="text-sm mt-8">To,</p>
                      <p className="text-sm">The Deputy Director, E-gov for placing the same on the website of</p>
                      <p className="text-sm">MCA at 'Notices' 'What's New and e-consultation module.</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  NOTE: Stakeholders to ensure that relevant comments are provided against their selected Actions. It is mandatory to Save every comment entered for each selected Chapter before submitting an E-Consultation paper.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instruction-kit" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="bg-gov-light-blue rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-gov-blue rounded-md flex items-center justify-center mr-4">
                        <div className="text-white font-bold text-xs">GOI</div>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-gov-blue">MINISTRY OF</h3>
                        <h3 className="text-lg font-bold text-gov-blue">CORPORATE AFFAIRS</h3>
                        <p className="text-xs text-muted-foreground">GOVERNMENT OF INDIA</p>
                      </div>
                    </div>
                    <div className="text-right mb-4">
                      <h2 className="text-base font-semibold">EMPOWERING BUSINESS, PROTECTING INVESTORS</h2>
                      <div className="flex justify-center space-x-2 text-xs mt-1">
                        <span className="text-gov-orange">REGULATOR</span>
                        <span>•</span>
                        <span className="text-gov-green">INTEGRATOR</span>
                        <span>•</span>
                        <span className="text-gov-red">FACILITATOR</span>
                        <span>•</span>
                        <span className="text-gov-blue">EDUCATOR</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-semibold">Ministry of Corporate Affairs (MCA)</h2>
                    <h3 className="text-base font-medium mt-2">Instruction kit</h3>
                    <h3 className="text-base font-medium">E-Consultation</h3>
                    <p className="text-sm text-right mt-4">Release Date: 26 April 2021</p>
                  </div>
                  
                  <div className="text-left">
                    <h4 className="font-semibold mb-3">Table of Contents</h4>
                    <ol className="space-y-1 text-sm">
                      <li className="text-gov-blue hover:underline cursor-pointer">1. Purpose of this document</li>
                      <li className="text-gov-blue hover:underline cursor-pointer">2. Confidentiality</li>
                      <li className="text-gov-blue hover:underline cursor-pointer">3. Accessing the E-Consultation Module</li>
                      <li className="text-gov-blue hover:underline cursor-pointer">4. Accessing the documents for providing consultation comments/suggestions</li>
                      <li className="text-gov-blue hover:underline cursor-pointer">5. Instructions for submitting a public comment</li>
                      <li className="text-gov-blue hover:underline cursor-pointer">6. User Profile Information and OTP Verification</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="document-details" className="mt-6">
            <div className="flex items-center justify-end mb-4 space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>

            {/* Document Metadata */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-6 gap-4 text-sm">
                  <div>
                    <label className="font-semibold text-muted-foreground">Document ID</label>
                    <p>J34I_D</p>
                  </div>
                  <div>
                    <label className="font-semibold text-muted-foreground">Type of Documents</label>
                    <p>Report</p>
                  </div>
                  <div>
                    <label className="font-semibold text-muted-foreground">Document Name</label>
                    <p>Establishment of Indian Multi-Disciplinary P...</p>
                  </div>
                  <div>
                    <label className="font-semibold text-muted-foreground">Name of Act</label>
                    <p>Not Applicable</p>
                  </div>
                  <div>
                    <label className="font-semibold text-muted-foreground">Posted On</label>
                    <p>17 September 2025</p>
                  </div>
                  <div>
                    <label className="font-semibold text-muted-foreground">Comments due date</label>
                    <p>30 September 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Document Content */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="mb-4">
                        The undersigned is directed to refer to the subject mentioned above and to say that the Government of India is committed to enabling the growth of large Indian firms capable of competing with leading international players by facilitating establishment of Indian Multi-Disciplinary Partnership (MDP) firms. In this context, a Background Note has been prepared to identify the challenges faced by Indian firms and to seek suggestions for necessary amendments to laws, rules, and regulations. These inputs will help strengthen Indian firms to compete not only in the domestic market but also globally.
                      </p>
                      <p className="mb-4">
                        2. The Ministry of Corporate Affairs is actively working towards amending the relevant Acts, rules, and regulations to support the growth of domestic MDPs and enhance their international competitiveness.
                      </p>
                      <p>
                        3. All stakeholders are requested to review the Background Note and submit their responses on the same latest by 30.09.2025 on 'e-
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Comment Form */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-sm font-semibold">Attach a file to this Document</h3>
                          <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                        </div>
                        <Button variant="outline" className="w-full">
                          Choose File
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, Word Doc, PNG, JPEG
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-semibold mb-2 block">Actions</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a chapter or section to comment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="section1">Section 1</SelectItem>
                            <SelectItem value="section2">Section 2</SelectItem>
                            <SelectItem value="section3">Section 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-semibold mb-2 block">Add Comments</label>
                        <Textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Enter comment here..."
                          className="min-h-32"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="secondary" onClick={handleSave} className="flex-1">
                          SAVE
                        </Button>
                        <Button onClick={handleSubmit} className="flex-1 bg-gov-blue hover:bg-gov-blue-dark">
                          SUBMIT
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              NOTE: Stakeholders to ensure that relevant comments are provided against their selected Actions. It is mandatory to Save every comment entered for each selected Chapter before submitting an E-Consultation paper.
            </p>
          </TabsContent>
        </Tabs>
      </main>

      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default DocumentDetails;