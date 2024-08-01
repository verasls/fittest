import { Heading } from "@/components/ui/heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/app/dashboard">Início</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/app/evaluations">Avaliações</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem className="pointer-events-none text-foreground">
            Nova avaliação
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading type="h2">Adicionar nova avaliação</Heading>

          <Tabs defaultValue="client">
            <TabsList>
              <TabsTrigger value="client">Cliente</TabsTrigger>
              <TabsTrigger value="anamnesis">Anamnese</TabsTrigger>
              <TabsTrigger value="perimeters">Perímetros</TabsTrigger>
              <TabsTrigger value="skinfolds">Dobras cutâneas</TabsTrigger>
              <TabsTrigger value="observations">Observações</TabsTrigger>
            </TabsList>
            <TabsContent value="client">Selecionar cliente</TabsContent>
            <TabsContent value="anamnesis">Anamnese</TabsContent>
            <TabsContent value="perimeters">Perímetros</TabsContent>
            <TabsContent value="skinfolds">Dobras cutâneas</TabsContent>
            <TabsContent value="observations">Observações</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
