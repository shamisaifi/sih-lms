import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  ChevronRight,
  Upload,
  DollarSign,
  Book,
  X,
  ArrowLeft,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

export function CourseCreator() {
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    thumbnail: null,
    files: [],
    isFree: true,
    price: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIsFreeChange = (checked) => {
    setCourseData((prev) => ({
      ...prev,
      isFree: checked,
      price: checked ? "" : prev.price,
    }));
  };

  const onThumbnailDrop = useCallback((acceptedFiles) => {
    setCourseData((prev) => ({ ...prev, thumbnail: acceptedFiles[0] }));
  }, []);

  const onFilesDrop = useCallback((acceptedFiles) => {
    setCourseData((prev) => ({
      ...prev,
      files: [...prev.files, ...acceptedFiles],
    }));
  }, []);

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const { getRootProps: getFilesRootProps, getInputProps: getFilesInputProps } =
    useDropzone({
      onDrop: onFilesDrop,
      accept: {
        "application/pdf": [],
        "application/msword": [],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [],
        "video/mp4": [],
      },
      multiple: true,
    });

  const removeFile = (index) => {
    setCourseData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the courseData to your backend
    console.log("Course data submitted:", courseData);
    // Reset form or redirect user
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="courseName" className="text-lg font-semibold">
                Course Name
              </Label>
              <Input
                id="courseName"
                name="name"
                value={courseData.name}
                onChange={handleInputChange}
                placeholder="Enter course name"
                className="mt-2"
              />
            </div>
            <div>
              <Label
                htmlFor="courseDescription"
                className="text-lg font-semibold"
              >
                Course Description
              </Label>
              <Textarea
                id="courseDescription"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                className="mt-2"
                rows={4}
              />
            </div>
            <div>
              <Label className="text-lg font-semibold mb-2 block">
                Pricing
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFree"
                  checked={courseData.isFree}
                  onCheckedChange={handleIsFreeChange}
                />
                <Label htmlFor="isFree">Free Course</Label>
              </div>
              {!courseData.isFree && (
                <div className="mt-4">
                  <Label htmlFor="price" className="text-base font-medium">
                    Price (USD)
                  </Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={courseData.price}
                      onChange={handleInputChange}
                      placeholder="29.99"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <Label htmlFor="thumbnail" className="text-lg font-semibold">
              Course Thumbnail
            </Label>
            <div
              {...getThumbnailRootProps()}
              className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10"
            >
              <div className="text-center">
                <input {...getThumbnailInputProps()} />
                {courseData.thumbnail ? (
                  <div>
                    <img
                      src={URL.createObjectURL(courseData.thumbnail)}
                      alt="Course thumbnail preview"
                      className="mx-auto h-32 w-32 object-cover rounded"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      {courseData.thumbnail.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload
                      className="mx-auto h-12 w-12 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <span className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <Label htmlFor="courseFiles" className="text-lg font-semibold">
              Course Files (PDFs, Docs, Videos)
            </Label>
            <div
              {...getFilesRootProps()}
              className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10"
            >
              <div className="text-center">
                <input {...getFilesInputProps()} />
                <Upload
                  className="mx-auto h-12 w-12 text-gray-400"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <span className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark">
                    Upload files
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PDF, DOC, MP4 up to 50MB each
                </p>
              </div>
            </div>
            {courseData.files.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-lg mb-2">Uploaded Files:</h4>
                <ul className="space-y-2">
                  {courseData.files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-sm bg-gray-100 p-2 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <Book className="h-4 w-4 text-gray-500" />
                        <span>{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Review Your Course</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Basic Information
                </h4>
                <p>
                  <strong>Name:</strong> {courseData.name}
                </p>
                <p>
                  <strong>Description:</strong> {courseData.description}
                </p>
                <p>
                  <strong>Pricing:</strong>{" "}
                  {courseData.isFree ? "Free" : `$${courseData.price}`}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Thumbnail</h4>
                {courseData.thumbnail ? (
                  <img
                    src={URL.createObjectURL(courseData.thumbnail)}
                    alt="Course thumbnail preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <p>No thumbnail uploaded</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Course Files</h4>
              {courseData.files.length > 0 ? (
                <ul className="space-y-2">
                  {courseData.files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <Book className="h-4 w-4 text-gray-500" />
                      <span>{file.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No files uploaded</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button title="Go back" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-6 w-6" />
      </button>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create a New Course
        </h1>
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={item}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`rounded-full h-12 w-12 flex items-center justify-center ${
                    step >= item
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-200 text-gray-600"
                  } transition-colors duration-200`}
                >
                  {step > item ? <Check className="h-6 w-6" /> : item}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step >= item ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {item === 1
                    ? "Basic Info"
                    : item === 2
                    ? "Thumbnail"
                    : item === 3
                    ? "Content"
                    : "Review"}
                </span>
              </div>
            ))}
            <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200 -z-10">
              <div
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>
        </div>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Previous
                  </Button>
                )}
                {step < 4 ? (
                  <Button
                    type="button"
                    className="ml-auto"
                    onClick={() => setStep(step + 1)}
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    Create Course
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
