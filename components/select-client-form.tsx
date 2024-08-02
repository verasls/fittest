"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Evaluation, evaluationSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SelectClientForm() {
  const form = useForm<z.infer<typeof evaluationSchema>>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      clientId: "",
      date: undefined,
    },
  });

  function onSubmit(values: Evaluation) {
    console.log(values);
  }

  return (
    <Card className="px-10 py-8">
      <CardHeader>
        <CardTitle>Selecionar cliente</CardTitle>
        <CardDescription>
          <p>Preencha as informações abaixo para adicionar um novo cliente.</p>
          <p>Os campos marcados (*) são obrigatórios.</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
          >
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Cliente*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox">
                          <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Buscar cliente..." />
                        <CommandList>
                          <CommandEmpty>Nenhum cliente encontrado</CommandEmpty>
                          <CommandGroup>
                            <CommandItem>Lucas</CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Data da avaliação*</FormLabel>
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
              <Button type="submit">Próximo</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
