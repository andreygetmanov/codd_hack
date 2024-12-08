import {
  Button,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Collapse
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { z } from "zod"


import { ApartsService } from "../../client"
import ActionsMenuApart from "../../components/Common/ActionsMenuApart"
const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

const PER_PAGE = 7

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ApartsService.readAparts({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["Aparts", { page }],
  }
}

function ItemsTable() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleToggleExpand = (id: number | undefined) => {
    setExpandedRow((prev) => (prev === id ? null : id ?? null)); // Добавляем проверку на undefined
  };
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: items,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getItemsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && items?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getItemsQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>Инцидент</Th>
              <Th>Дата и время</Th>
              <Th>Координаты</Th>
              <Th>Описание</Th>
              <Th>Действия</Th>
            </Tr>
          </Thead>
          {isPending ? (
            <Tbody>
              <Tr>
                {new Array(4).fill(null).map((_, index) => (
                  <Td key={index}>
                    <SkeletonText noOfLines={1} paddingBlock="16px" />
                  </Td>
                ))}
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {items?.data.map((item) => (
                <Tr 
                  key={item.id_rep} 
                  opacity={isPlaceholderData || item.checked ? 0.5 : 1}
                >
                  <Td>{item.incident}</Td>
                  <Td isTruncated maxWidth="150px">
                    {item.last_date} {item.last_time}
                  </Td>
                  <Td isTruncated maxWidth="150px">
                    {item.latitude}, {item.longitude}
                  </Td>
                  <Td>
                   <Box
                      cursor="pointer"
                      onClick={() => handleToggleExpand(item.id_rep)}
                      maxW="150px"
                      textOverflow="ellipsis"
                      whiteSpace={expandedRow === item.id_rep ? "normal" : "nowrap"}
                      overflow={expandedRow === item.id_rep ? "visible" : "hidden"}
                    >
                      {item.description}
                    </Box>
                    <Collapse in={expandedRow === item.id_rep} animateOpacity>
                      <Box maxW="150px">{item.description}</Box>
                    </Collapse>
                  </Td>
                  <Td>
                    <ActionsMenuApart value={item} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Flex
        gap={4}
        alignItems="center"
        mt={4}
        direction="row"
        justifyContent="flex-end"
      >
        <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Flex>
    </>
  )
}

function Items() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Заявки
      </Heading>
      <ItemsTable />
    </Container>
  )
}
