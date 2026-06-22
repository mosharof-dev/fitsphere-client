"use client";

import PageContainer from "@/components/dashboard/PageContainer";
import { uploadToImgBB } from "@/lib/actions/image-upload";
import {
  Button,
  Form,
  Input,
  Label,
  ListBox,
  TextField,
  Select,
  Separator,
  NumberField,
  Description,
  Surface,
  TextArea,
  TimeField,
} from "@heroui/react";
import { Check } from "lucide-react";

export default function AddClassPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard/trainer/overview" },
    { label: "Add Class" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data: ", data);
    const uploadedUrl = await uploadToImgBB(data.featured_image);
  };

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <Form className="flex  flex-col gap-4" onSubmit={handleSubmit}>
        <TextField isRequired name="class_name" type="text">
          <Label>Class Name</Label>
          <Input placeholder="Enter your class name" />
        </TextField>
        <TextField isRequired name="featured_image" type="file">
          <Label>Featured Image</Label>
          <Input placeholder="Upload featured image" accept="image/*" />
        </TextField>
        <Select className="" placeholder="Select Difficulty">
          <Label>Difficulty Level</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="beginner" textValue="Beginner">
                Beginner
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="intermediate" textValue="Intermediate">
                Intermediate
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="advanced" textValue="Advanced">
                Advanced
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="advanced" textValue="Advanced">
                Advanced
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <Select className="" placeholder="Select one">
          <Label>Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="yoga" textValue="Yoga">
                Yoga
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="zumba" textValue="Zumba">
                Zumba
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="cardio" textValue="Cardio">
                Cardio
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item
                id="strength-training"
                textValue="Strength Training"
              >
                Strength Training
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item
                id="functional-training"
                textValue="Functional Training"
              >
                Functional Training
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="weight-loss" textValue="Weight Loss">
                Weight Loss
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="crossfit" textValue="CrossFit">
                CrossFit
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="bodybuilding" textValue="Bodybuilding">
                Bodybuilding
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="pilates" textValue="Pilates">
                Pilates
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="hiit" textValue="HIIT">
                HIIT
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <Select placeholder="Select Class Duration">
          <Label>Duration</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Section>
                <ListBox.Item id="30minutes" textValue="30 minutes">
                  30 minutes
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox.Section>
              <Separator />
              <ListBox.Section>
                <ListBox.Item id="60minutes" textValue="60 minutes">
                  60 minutes
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox.Section>
              <Separator />
              <ListBox.Section>
                <ListBox.Item id="90minutes" textValue="90 minutes">
                  90 minutes
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox.Section>
              <Separator />
              <ListBox.Section>
                <ListBox.Item id="120minutes" textValue="120 minutes">
                  120 minutes
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox.Section>
            </ListBox>
          </Select.Popover>
        </Select>
        <NumberField className="w-full " minValue={0} name="price">
          <Label>Price</Label>
          <NumberField.Group>
            <NumberField.DecrementButton />
            <NumberField.Input />
            <NumberField.IncrementButton />
          </NumberField.Group>
        </NumberField>
        <TimeField name="time">
          <Label>Time</Label>
          <TimeField.Group>
            <TimeField.Input>
              {(segment) => <TimeField.Segment segment={segment} />}
            </TimeField.Input>
          </TimeField.Group>
        </TimeField>
        <Surface className="w-[256px] rounded-3xl shadow-surface">
          <ListBox aria-label="Users" selectionMode="multiple">
            <ListBox.Item id="1" textValue="Bob">
              <div className="flex flex-col">
                <Label>Sun</Label>
                <Description>Sunday</Description>
              </div>
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <Check className="size-4 text-accent-soft-foreground" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="2" textValue="Fred">
              <div className="flex flex-col">
                <Label>Mon</Label>
                <Description>Monday</Description>
              </div>
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <Check className="size-4 text-accent-soft-foreground" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="3" textValue="Martha">
              <div className="flex flex-col">
                <Label>Tue</Label>
                <Description>Tuesday</Description>
              </div>
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <Check className="size-4 text-accent-soft-foreground" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="3" textValue="Martha">
              <div className="flex flex-col">
                <Label>Wed</Label>
                <Description>Wednesday</Description>
              </div>
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <Check className="size-4 text-accent-soft-foreground" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="3" textValue="Martha">
              <div className="flex flex-col">
                <Label>Thu</Label>
                <Description>Thursday</Description>
              </div>
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <Check className="size-4 text-accent-soft-foreground" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="3" textValue="Martha">
              <div className="flex flex-col">
                <Label>Fri</Label>
                <Description>Friday</Description>
              </div>
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <Check className="size-4 text-accent-soft-foreground" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
            <ListBox.Item id="3" textValue="Martha">
              <div className="flex flex-col">
                <Label>Sat</Label>
                <Description>Saturday</Description>
              </div>
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <Check className="size-4 text-accent-soft-foreground" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
          </ListBox>
        </Surface>
        <div className="flex flex-col gap-2">
          <Label htmlFor="textarea-rows-6">Class Description</Label>
          <TextArea
            aria-label="Class Description"
            id="textarea-rows-6"
            placeholder="Write out the class description..."
            rows={6}
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </PageContainer>
  );
}
