<?php
require('fpdf.php');

class PDF extends FPDF {
    function Header() {
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 10, 'Relatorio Financeiro', 0, 1, 'C');
    }

    function Footer() {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, 'Página ' . $this->PageNo(), 0, 0, 'C');
    }

    function ChapterTitle($title) {
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 10, $title, 0, 1);
        $this->Ln(4);
    }

    function ChapterBody($body) {
        $this->SetFont('Arial', '', 12);
        $this->MultiCell(0, 10, $body);
        $this->Ln();
    }
}

// Cria o objeto PDF
$pdf = new PDF();
$pdf->AddPage();

// Exemplo de transações - isso seria gerado dinamicamente a partir do banco de dados ou de arquivos JSON.
$transacoes = [
    ['descricao' => 'Venda de produto', 'valor' => 100, 'tipo' => 'entrada'],
    ['descricao' => 'Compra de material', 'valor' => 50, 'tipo' => 'saida'],
];

$pdf->ChapterTitle('Transações');
foreach ($transacoes as $t) {
    $pdf->ChapterBody("Tipo: {$t['tipo']} | Descrição: {$t['descricao']} | Valor: R$ {$t['valor']}");
}

$pdf->Output();
?>
