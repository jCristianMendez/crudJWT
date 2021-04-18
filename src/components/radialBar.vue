<template>
<v-row justify="center" align="center" class="rowMargin">
  <apexchart type="radialBar" width="100" height="90" :options="chartOptions" :series="[porcentaje]"></apexchart>
</v-row>
</template>

<script>
export default {
  data () {
    return {

      chartOptions: {
          chart: {
              type: 'radialBar',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                 hollow: {
                  margin: 0,
                  size: '50%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '90%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: 10,
                    show: false,
                    color: '#888',
                    fontSize: '8px',
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val)+"%";
                    },
                    offsetY: 4,
                    color: '#111',
                    fontSize: '9px',
                    show: true,
                  }
                }
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: [''],
      },
    }
  },
  props: {
    porcentaje: Number,
  }
};
</script>

<style>
.rowMargin{
    margin-top: 0px !important;
    margin-bottom: -14px !important;
}
</style>