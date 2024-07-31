"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CircleCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/actions";
import { Client, clientSchema } from "@/lib/schema";
import { useToast } from "@/components/ui/use-toast";

type CreateClientFormProps = {
  userId: string;
};

export default function CreateClientForm({ userId }: CreateClientFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      userId: userId,
      name: "",
      email: "",
      phone: "",
      sex: undefined,
      dateOfBirth: undefined,
    },
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (!isDirty) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
  }, [isDirty]);

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    let formattedValue;
    if (value.length > 6) {
      formattedValue =
        value.length > 10
          ? `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
          : `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      formattedValue = value;
    }

    event.target.value = formattedValue;
    form.setValue("phone", formattedValue);
  }

  async function onSubmit(values: Client) {
    await createClient(values);
    toast({
      description: (
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <CircleCheck className="h-6 w-6" />
          </div>
          <span>Cliente adicionado com sucesso!</span>
        </div>
      ),
    });
  }

  return (
    <Card className="px-10 py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3"
        >
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} type="hidden" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 flex w-full flex-col">
                <FormLabel>Nome*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 flex w-full flex-col">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-2 flex w-full flex-col">
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    inputMode="tel"
                    onChange={handlePhoneChange}
                    maxLength={15}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Sexo*</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Data de nascimento*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : ""}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      captionLayout="dropdown-buttons"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-start-2 flex justify-end pt-4">
            <Button type="submit">Concluir</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
